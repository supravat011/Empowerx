import React, { useState, useEffect, useCallback } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { CrowdFundingABI, CrowdFundingAddress } from "./constants";

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Data";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        try {
            const { title, description, amount, deadline } = campaign;
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime()
            );

            await transaction.wait();
            console.log("Contract Call Success", transaction);
        } catch (error) {
            console.error("Contract Call Failed:", error);
        }
    };

    const getCampaigns = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);
        const campaigns = await contract.getCampaigns();

        return campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            pId: i,
        }));
    };

    const getUserCampaigns = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);
        const allCampaigns = await contract.getCampaigns();
        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        return allCampaigns
            .filter((campaign) => campaign.owner === accounts[0])
            .map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));
    };

    const donate = async (pId, amount) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const transaction = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await transaction.wait();
        return transaction;
    };

    const getDonations = async (pId) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(Number(pId));
        return donations[0].map((donator, i) => ({
            donator,
            donation: ethers.utils.formatEther(donations[1][i].toString()),
        }));
    };

    const checkIfWalletConnected = useCallback(async () => {
        try {
            if (!window.ethereum) {
                console.log("MetaMask is not installed. Please install MetaMask extension.");
                return;
            }

            // Check if MetaMask is the provider
            if (window.ethereum.isMetaMask) {
                console.log("MetaMask detected");
            }

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("Connected to MetaMask account:", accounts[0]);
            } else {
                console.log("No MetaMask accounts found");
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    }, []);

    useEffect(() => {
        checkIfWalletConnected();

        // Listen for account changes in MetaMask
        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                console.log("MetaMask accounts disconnected");
                setCurrentAccount("");
            } else {
                console.log("MetaMask account changed to:", accounts[0]);
                setCurrentAccount(accounts[0]);
            }
        };

        // Listen for chain changes
        const handleChainChanged = (chainId) => {
            console.log("Network changed to:", chainId);
            // Optionally refresh the page or update UI
            window.location.reload();
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        // Cleanup listeners
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    }, [checkIfWalletConnected]);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install the MetaMask browser extension to continue.");
                window.open("https://metamask.io/download/", "_blank");
                return;
            }

            // Check if MetaMask is the provider
            if (!window.ethereum.isMetaMask) {
                alert("Please use MetaMask wallet to connect to this application.");
                return;
            }

            console.log("Requesting MetaMask connection...");
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
                console.log("Successfully connected to MetaMask account:", accounts[0]);
                
                // Optional: Request network switch to a specific network (e.g., Ethereum mainnet)
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x1" }], // Ethereum mainnet
                    });
                } catch (switchError) {
                    // User rejected the network switch or it failed
                    console.log("Network switch rejected or failed:", switchError);
                }
            } else {
                console.log("No accounts returned from MetaMask");
            }
        } catch (error) {
            if (error.code === 4001) {
                console.log("User rejected the connection request");
                alert("Connection rejected. Please try again and approve the connection in MetaMask.");
            } else {
                console.error("Error connecting to MetaMask:", error);
                alert("Failed to connect to MetaMask. Please try again.");
            }
        }
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};