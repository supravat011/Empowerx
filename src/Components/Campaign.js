import React, { useEffect, useContext, useState } from "react";
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
  } = useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!getCampaigns || !getUserCampaigns) {
        console.error("Campaign functions are undefined.");
        return;
      }

      try {
        const allCampaigns = await getCampaigns();
        setAllCampaign(allCampaigns || []); // Handle undefined data
        console.log("All campaigns:", allCampaigns); // Debugging log

        const userCampaigns = await getUserCampaigns();
        setUserCampaign(userCampaigns || []); // Handle undefined data
        console.log("User campaigns:", userCampaigns); // Debugging log
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, [getCampaigns, getUserCampaigns]);

  return (
    <div>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      {allCampaign.length > 0 && (
        <Card
          title="All Campaigns"
          allCampaign={allCampaign}
          setOpenModel={setOpenModel}
          setDonate={setDonateCampaign}
        />
      )}

      {userCampaign.length > 0 && (
        <Card
          title="Your Created Campaigns"
          allCampaign={userCampaign}
          setOpenModel={setOpenModel}
          setDonate={setDonateCampaign}
        />
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