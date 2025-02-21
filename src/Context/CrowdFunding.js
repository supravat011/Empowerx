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
                console.log("Install Metamask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
        }
    }, []);

    useEffect(() => {
        checkIfWalletConnected();
    }, [checkIfWalletConnected]);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                console.log("Install Metamask");
                return;
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error("Error While Connecting to Wallet:", error);
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