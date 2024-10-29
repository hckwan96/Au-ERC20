async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  // const provider = new ethers.providers.AlchemyProvider("homestead", process.env.ALCHEMY_API_KEY);

  const balanceWei = await deployer.provider.getBalance(deployer.address);

  console.log("Account balance:", ethers.formatEther(balanceWei)); 

  const Token = await ethers.getContractFactory("TokTok");
  const token = await Token.deploy();
  
  await token.deployed(); 

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
