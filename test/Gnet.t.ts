import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { parseEther } from "viem";
import hre, { ignition } from "hardhat";
import GnetModule from "../ignition/modules/Gnet.m";

describe("GNET", function () {
  const uri = "https://example.com";
  const totalSupply = parseEther("1000000000");
  const name = "GNET";
  const symbol = "GNET";

  async function deployFixture() {
    const [creator, otherAccount] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const { gnet } = await ignition.deploy(GnetModule, {
      parameters: {
        GnetModule: {
          metadataUri: uri,
        },
      },
    });

    return {
      gnet,
      creator,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should assign the total supply of gnet to the creator", async function () {
      const { gnet, creator } = await loadFixture(deployFixture);
      const creatorBalance = await gnet.read.balanceOf([creator.account.address]);
      expect(await gnet.read.totalSupply(), "Total supply should be equal to creator balance").to.equal(creatorBalance);
      expect(creatorBalance, "Creator balance should be equal to total supply").to.equal(totalSupply);
    });

    it("Should set the correct token parameters", async function () {
      const { gnet } = await loadFixture(deployFixture);
      expect(await gnet.read.name()).to.equal(name);
      expect(await gnet.read.symbol()).to.equal(symbol);
      expect(await gnet.read.decimals()).to.equal(18);
    });

    it("Should set the correct URI", async function () {
      const { gnet } = await loadFixture(deployFixture);
      expect(await gnet.read.tokenURI()).to.equal(uri);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { gnet, otherAccount } = await loadFixture(deployFixture);
      const transferAmount = 666n;

      await gnet.write.transfer([otherAccount.account.address, transferAmount]);

      const otherAccountBalance = await gnet.read.balanceOf([otherAccount.account.address]);
      expect(otherAccountBalance).to.equal(transferAmount);
    });

    it("Should burn tokens", async function () {
      const { gnet, creator } = await loadFixture(deployFixture);
      const burnAmount = parseEther("123");

      await gnet.write.burn([burnAmount]);

      const creatorBalance = await gnet.read.balanceOf([creator.account.address]);
      expect(creatorBalance).to.equal(totalSupply - burnAmount);
    });
  });
}); 