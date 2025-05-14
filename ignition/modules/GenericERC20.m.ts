// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GenericERC20Module = buildModule("GenericERC20Module", (m) => {
  const name = m.getParameter("name", "GenericERC20");
  const symbol = m.getParameter("symbol", "GEN");
  const initialSupply = m.getParameter("initialSupply", 1000000000);

  const genericERC20 = m.contract("GenericERC20", [name, symbol, initialSupply]);

  return { genericERC20 };
});

export default GenericERC20Module;
