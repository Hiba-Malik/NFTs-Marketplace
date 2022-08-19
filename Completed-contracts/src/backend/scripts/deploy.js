async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  // Get the ContractFactories and Signers here.
  const NFTContract = await ethers.getContractFactory('NFTContract');
  const Marketplace = await ethers.getContractFactory('Marketplace');
  // deploy contracts
  const nft = await NFTContract.deploy(
    '0x0FB918Da7dC7251a41266F638575398399DcC792'
  );
  const marketplace = await Marketplace.deploy();

  console.log('NFT Mint Address: ', nft.address);

  console.log('NFT Marketplace Address: ', marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat compile --all
// npx hardhat run src/backend/scripts/deploy.js --network <name>
// npx hardhat verify <contractAddress>

// DEPLOYED SUCCESSFULLY

// visit link - ignore errors. it's because of install extensions
// https://rinkeby.etherscan.io/address/0x9b88927231efcEA968D248BCC2582d3116a03F38#code
