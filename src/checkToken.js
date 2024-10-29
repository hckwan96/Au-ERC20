const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace with your deployed token address
  const tokenAddress = "0x914db30e54d0b1c76a1d0bca83220a0c085bfec7";
  
  // Load the full ABI from the contract's artifacts
  const tokenAbi = JSON.parse(fs.readFileSync("artifacts/contracts/TokTok.sol/TokTok.json")).abi;

  const token = new ethers.Contract(tokenAddress, tokenAbi, deployer);

  try {
    const totalSupply = await token.totalSupply();
    console.log("Total Supply:", ethers.formatUnits(totalSupply, 18));

    const deployerBalance = await token.balanceOf(deployer.address);
    const otherBalance = await token.balanceOf("0x62cE4854850c21182d9Fdb7918D5B0018F15e140");

    console.log("Deployer's Token Balance:", ethers.formatUnits(deployerBalance, 18));
    console.log("Other's Token Balance:", ethers.formatUnits(otherBalance, 18));
  } catch (error) {
    console.error("Error fetching contract data:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script error:", error);
    process.exit(1);
});
