const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketPlace", function(){
    const NFT = await ethers.getContractFactory("NFT");
    const MarketPlace = await ethers.getContractFactory("MarketPlace");

    [deployer, addr1, addr2] = await ethers.getSigners();
})