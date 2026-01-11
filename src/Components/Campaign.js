import React, { useEffect, useContext, useState, useCallback } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import Hero from "./Hero";
import Card from "./Card";
import PopUp from "./PopUp";

const Campaign = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
    currentAccount,
    connectWallet,
  } = useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = useCallback(async () => {
    if (!currentAccount) {
      console.log("No wallet connected. Please connect your wallet.");
      setError("Please connect your wallet to view campaigns");
      setIsLoading(false);
      return;
    }

    if (!getCampaigns || !getUserCampaigns) {
      console.error("Campaign functions are undefined.");
      setError("Campaign functions are not available");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching all campaigns...");
      const allCampaigns = await getCampaigns();
      console.log("All campaigns received:", allCampaigns);
      setAllCampaign(allCampaigns || []);

      console.log("Fetching user campaigns...");
      const userCampaigns = await getUserCampaigns();
      console.log("User campaigns received:", userCampaigns);
      setUserCampaign(userCampaigns || []);

      if (!allCampaigns || allCampaigns.length === 0) {
        // This is not an error, just empty state
        console.log("No campaigns found.");
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);

      // Handle specific error cases
      if (error.message && error.message.includes('Contract is not deployed')) {
        setError("Smart contract is not deployed. Please contact support.");
      } else if (error.code === 'CALL_EXCEPTION') {
        setError("Unable to interact with the smart contract. Please check your network connection.");
      } else if (error.code === 'NETWORK_ERROR') {
        setError("Network error. Please check your internet connection.");
      } else {
        console.error("Unknown error:", error);
        setError(`Failed to fetch campaigns: ${error.message || error}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [getCampaigns, getUserCampaigns, currentAccount]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  if (!currentAccount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-4">Please connect your wallet to view and create campaigns</p>
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="mt-4 space-y-2">
          {error.includes("No campaigns found") && (
            <button
              onClick={() => setError(null)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Campaign
            </button>
          )}
          <button
            onClick={fetchCampaigns}
            className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero titleData={titleData} createCampaign={createCampaign} refreshCampaigns={fetchCampaigns} />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading campaigns...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-red-600">{error}</h3>
          <div className="mt-4 space-y-2">
            {error.includes("No campaigns found") && (
              <button
                onClick={() => setError(null)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Campaign
              </button>
            )}
            <button
              onClick={fetchCampaigns}
              className="block w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {allCampaign.length > 0 ? (
            <Card
              title="All Campaigns"
              allCampaign={allCampaign}
              setOpenModel={setOpenModel}
              setDonate={setDonateCampaign}
            />
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-gray-600">No campaigns found</h3>
              <p className="text-gray-500 mt-2">Be the first to create a campaign!</p>
            </div>
          )}

          {userCampaign.length > 0 && (
            <Card
              title="Your Created Campaigns"
              allCampaign={userCampaign}
              setOpenModel={setOpenModel}
              setDonate={setDonateCampaign}
            />
          )}
        </>
      )}

      {openModel && donateCampaign && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </div>
  );
};

export default Campaign;