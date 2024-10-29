require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",

  networks: {
    sepolia: {
      url: process.env.ALCHEMY_KEY,
      accounts: [process.env.TESTNET_PRIVATEKEY]
    },
  }
};
