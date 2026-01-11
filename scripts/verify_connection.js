const hre = require("hardhat");
const { ethers } = require("hardhat");

// Import address from constants (we'll just hardcode it for the script to be sure we test what we think we are testing)
// const { CrowdFundingAddress, CrowdFundingABI } = require("../src/Context/constants"); 
// Note: requiring from src might fail due to ES6 modules. I'll copy the address and ABI or just use the artifact.

async function main() {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // The address we just updated
    console.log(`Checking contract at ${address}...`);

    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const network = await provider.getNetwork();
    console.log("Connected to network:", network);

    const code = await provider.getCode(address);
    if (code === "0x") {
        console.error("ERROR: No contract code found at this address!");
        return;
    }
    console.log("Contract code found.");

    // We can use the artifact to get the interface
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    const contract = CrowdFunding.attach(address);

    try {
        console.log("Attempting to fetch campaigns...");
        const campaigns = await contract.getCampaigns();
        console.log("Success! Campaigns fetched:", campaigns);
    } catch (error) {
        console.error("Failed to fetch campaigns:", error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
