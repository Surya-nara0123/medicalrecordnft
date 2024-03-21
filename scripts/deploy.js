async function main() {
  // Grab the contract factory 
  const MedNFT = await ethers.getContractFactory("MedNFT");

  const initialOwner = "0x2F9923C613D752313466bDf2E142F335f4BDA86d"

  // Start deployment, returning a promise that resolves to a contract object
  const medNFT = await MedNFT.deploy(initialOwner); // Instance of the contract 
  console.log("Contract deployed to address:", medNFT.target);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });