import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { getAccounts } from "./lib/hardhatUtils";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://sepolia.drpc.org",
      accounts: getAccounts(),
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY!,
    },
    customChains: [
      {
        network: 'sepolia',
        chainId: 11155111,
        urls: {
          apiURL: 'https://api-sepolia.etherscan.io/api',
          browserURL: 'https://sepolia.etherscan.io/',
        },
      },
    ],
  },
};

export default config;
