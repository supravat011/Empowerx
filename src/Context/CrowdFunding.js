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
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const createCampaign = useCallback(async (campaign) => {
        try {
            const { title, description, amount, deadline } = campaign;
            if (!signer) {
                console.error("createCampaign: Signer not available. Please connect wallet.");
                return;
            }
            console.log("createCampaign: Signer available, creating contract instance.");
            const contract = fetchContract(signer);

            console.log("createCampaign: Calling contract.createCampaign with:", {
                currentAccount,
                title,
                description,
                amount: ethers.utils.parseUnits(amount, 18),
                deadline: new Date(deadline).getTime()
            });

            let transaction;
            try {
                transaction = await contract.createCampaign(
                    currentAccount,
                    title,
                    description,
                    ethers.utils.parseUnits(amount, 18),
                    new Date(deadline).getTime()
                );
                console.log("createCampaign: Transaction object received from contract call:", transaction);
            } catch (contractError) {
                console.error("createCampaign: Error during contract call:", contractError);
                throw contractError; // Re-throw to be caught by the outer catch
            }

            console.log("createCampaign: Transaction sent, waiting for confirmation.", transaction);
            await transaction.wait();
            console.log("createCampaign: Contract Call Success", transaction);
            return transaction;
        } catch (error) {
            console.error("createCampaign: Contract Call Failed:", error);
        }
    }, [signer, currentAccount]);

    const getCampaigns = useCallback(async () => {
        try {
            if (!provider) {
                console.error("Provider not available. Please connect wallet.");
                return [];
            }

            // Log provider details
            console.log("Provider network:", await provider.getNetwork());
            console.log("Provider address:", await provider.getSigner().getAddress());

            console.log("Creating contract instance with address:", CrowdFundingAddress);
            const contract = fetchContract(provider);

            // Verify contract instance
            console.log("Contract instance created:", contract);
            console.log("Contract address:", contract.address);

            // Check if contract is deployed
            const code = await provider.getCode(CrowdFundingAddress);
            if (code === '0x') {
                throw new Error('Contract is not deployed at the specified address');
            }

            console.log("Calling getCampaigns()...");
            const campaigns = await contract.getCampaigns();
            console.log("Raw campaigns data:", campaigns);

            if (!campaigns || campaigns.length === 0) {
                console.log("No campaigns found");
                return [];
            }

            const formattedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));

            console.log("Formatted campaigns:", formattedCampaigns);
            return formattedCampaigns;
        } catch (error) {
            console.error("Error in getCampaigns:", error);
            if (error.code === 'CALL_EXCEPTION') {
                console.error("Contract call failed. This might mean:");
                console.error("1. The contract is not deployed at the specified address");
                console.error("2. The contract ABI doesn't match the deployed contract");
                console.error("3. You're connected to the wrong network");
            }
            throw error; // Re-throw to be handled by the component
        }
    }, [provider]);

    const getUserCampaigns = useCallback(async () => {
        if (!provider) {
            console.error("Provider not available. Please connect wallet.");
            return [];
        }
        const contract = fetchContract(provider);
        const allCampaigns = await contract.getCampaigns();

        if (!currentAccount) {
            return []; // Return empty if no account is connected
        }

        return allCampaigns
            .filter((campaign) => campaign.owner === currentAccount)
            .map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));
    }, [provider, currentAccount]);

    const donate = useCallback(async (pId, amount) => {
        if (!signer) {
            console.error("Signer not available. Please connect wallet.");
            return;
        }
        const contract = fetchContract(signer);

        const transaction = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await transaction.wait();
        return transaction;
    }, [signer]);

    const getDonations = useCallback(async (pId) => {
        if (!provider) {
            console.error("Provider not available. Please connect wallet.");
            return [];
        }
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(Number(pId));
        return donations[0].map((donator, i) => ({
            donator,
            donation: ethers.utils.formatEther(donations[1][i].toString()),
        }));
    }, [provider]);

    const checkIfWalletConnected = useCallback(async () => {
        try {
            if (!window.ethereum) {
                console.log("Install Metamask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                const connection = await new Web3Modal().connect();
                const web3Provider = new ethers.providers.Web3Provider(connection);
                setProvider(web3Provider);
                setSigner(web3Provider.getSigner());
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
                setCurrentAccount("");
                setProvider(null);
                setSigner(null);
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    }, []);

    useEffect(() => {
        checkIfWalletConnected();
    }, [checkIfWalletConnected]);

    const connectWallet = useCallback(async () => {
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }

            // Try to switch to Localhost network
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x7A69' }], // 31337 in hex
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x7A69',
                                    chainName: 'Localhost 8545',
                                    rpcUrls: ['http://127.0.0.1:8545'],
                                    nativeCurrency: {
                                        name: 'ETH',
                                        symbol: 'ETH',
                                        decimals: 18
                                    },
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error("Failed to add network:", addError);
                    }
                } else {
                    console.error("Failed to switch network:", switchError);
                }
            }

            // Request accounts explicitly
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            // Use Web3Modal as fallback/provider wrapper
            const connection = await new Web3Modal().connect();
            const web3Provider = new ethers.providers.Web3Provider(connection);

            setProvider(web3Provider);
            setSigner(web3Provider.getSigner());
            setCurrentAccount(accounts[0]);

            console.log("Wallet connected:", accounts[0]);
        } catch (error) {
            console.error("Error While Connecting to Wallet:", error);
            alert("Failed to connect wallet: " + error.message);
        }
    }, []);

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
                provider,
                signer,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};