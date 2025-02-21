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
  const [donateCampaign, setDonateCampaign] = useState();

  useEffect(() => {
    getCampaigns().then(res => {
      setAllCampaign(res);
      console.log(res);
    });
    getUserCampaigns().then(res => {
      setUserCampaign(res);
      console.log(res);
    });
  }, []);

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

      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </div>
  );
}

export default Campaign;
