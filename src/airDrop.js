// scripts/airdrop.js

const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Specify the token contract address and signer details
  const tokenAddress = "0x914db30e54d0b1c76a1d0bca83220a0c085bfec7";
  const [deployer] = await ethers.getSigners();
  const tokenAbi = JSON.parse(fs.readFileSync("artifacts/contracts/TokTok.sol/TokTok.json")).abi;

  const token = new ethers.Contract(tokenAddress, tokenAbi, deployer);

  console.log("Running airdrop with the account:", deployer.address);

  const deployerBalance = await token.balanceOf(deployer.address);
  console.log("Deployer balance:", ethers.formatUnits(deployerBalance, 18));

  // Connect to the TokTok token contract
  const TokTok = await ethers.getContractFactory("TokTok");
  const toktok = TokTok.attach(tokenAddress);

  // List of recipient addresses and airdrop amounts
  const recipients = [
    { address: "0x62cE4854850c21182d9Fdb7918D5B0018F15e140", 
      amount: ethers.parseUnits("1", 18) },
    // { address: "0xRecipientAddress2", amount: ethers.utils.parseUnits("15", 18) },
    // { address: "0xRecipientAddress3", amount: ethers.utils.parseUnits("20", 18) },
  ];

  // Airdrop tokens
  for (const recipient of recipients) {
    const tx = await toktok.transfer(recipient.address, recipient.amount);
    await tx.wait(); // Wait for each transaction to be mined
    console.log(`Airdropped ${ethers.formatUnits(recipient.amount, 18)} tokens to ${recipient.address}`);
  }

  console.log("Airdrop completed successfully.");
}

// Run the script with error handling
main().catch((error) => {
  console.error("Airdrop script failed:", error);
  process.exitCode = 1;
});
