// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GnetModule = buildModule("GnetModule", (m) => {
  const uri = m.getParameter("metadataUri", "ipfs://QmXzYG2nPBxDftKLJZ95mZiKcbat5kkp4yjkZGVnrqjVuS");

  const gnet = m.contract("GNET", [uri]);

  return { gnet };
});

export default GnetModule;
