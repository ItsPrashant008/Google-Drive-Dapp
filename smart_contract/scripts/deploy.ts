import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("GoogleDrive");
  const token = await Token.deploy();

  await token.deployed(); 
  console.log("Token Address-> ", token.address);

  await token.deployTransaction.wait(5);

    await hre.run("verify:verify", {
        address: token.address,
        contract: "contracts/GoogleDrive.sol:GoogleDrive",
    });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('Deploy error-> ', error); process.exit(1);
  });