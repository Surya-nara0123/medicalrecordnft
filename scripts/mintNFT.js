require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider('sepolia', API_KEY)

const contract = require("../artifacts/contracts/medNFT.sol/MedNFT.json");

console.log(JSON.stringify(contract.abi));

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0xE262C4f51b0B27cAbCB50Cc5Ed432e9d6e215135'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

//QmPqohRASjtBr86K65aJD8WAanXVThHz4o2yjAgVzKxHHp

// Get the NFT Metadata IPFS URL
// const tokenUri = "https://gateway.pinata.cloud/ipfs/QmPqohRASjtBr86K65aJD8WAanXVThHz4o2yjAgVzKxHHp"

// Call mintNFT function
const mintNFT = async (tokenUri) => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}
// tired inside express refuse social race page slight tuition team world sight
// mintNFT(tokenUri)
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });