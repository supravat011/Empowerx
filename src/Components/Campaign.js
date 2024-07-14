import React,{useEffect,useContext,useState} from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import Hero from "./Hero";
import Card from "./Card";
import PopUp from "./PopUp";

const Campaign = () =>{
    const{
        titleData,
        getCampaigns,
        createCampaign,
        donate,
        getUserCampaigns,
        getDonations,
    }= useContext(CrowdFundingContext);

    const [allCampaign,setAllcampaign] = useState([]);
    const [usercampaign,setUsercampaign] = useState();

    useEffect(()=>{
         getCampaigns().then(res=>{setAllcampaign(res)
            console.log(res);
        })
        // console.log(getCampaignsData);
        const userCampaignsData = getUserCampaigns();
        
    },[]);

    const [openModel,setOpenModel] = useState(false);
    const [donateCampaign, setDonateCampaign] = useState();
    console.log(donateCampaign);

    return(
        <div>
            <Hero titleData={titleData} createCampaign={createCampaign}/>
            {allCampaign.length>0&&<Card 
                title= "All Campaigns"
                allCampaign={allCampaign}
                setOpenModel={setOpenModel}
                setDonate={setDonateCampaign}

            />}
            {allCampaign?.map((campaign,i)=>(
                    <div
                        onClick={()=>(setDonateCampaign(campaign),setOpenModel(true))}
                        key={i+1}
                        className="cursor-pointer border overflow-hidden transition-shadow
                        duration-300 bg-white rounded"
                    >
                    <img 
                        src="https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?
                        auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                        className="object-cover w-full h-64 rounded"
                        alt=""
                    />
                    <div className="py-5 pl-2">
                        <p className="mb-2 text-xs font-semiboild text-gray-600 uppercase">
                            {/* DaysLeft:{campaign[4]} */}
                        </p>
                        <a href="/"
                        aria-label="Articel"
                        className="inline-block mb-3 text-black transition-colors duration-200
                        hover:text-deep-purple-accent-700"
                        >
                            <p className="text-2xl font-bold leading-5">{campaign[0]}</p>
                        </a>
                        <p className="mb-4 text-gray-700">{campaign[1]}</p>
                        <div className="flex space-x-4">
                            <p className="font-semibold">Target:{Number(campaign[3]._hex)}ETH</p>
                            <p className="font-semibold">
                                {/* Raised:{campaign.amountCollected}ETH */}
                                Raised:{Number(campaign[4]._hex)}ETH
                            </p>
                        </div>
                    </div>
                </div>
               ))}
             <Card 
                title="Your Created Campaigns"
                allCampaign={usercampaign}
                setOpenModel={setOpenModel}
                setDonate={setDonateCampaign}
            /> 
             {openModel && (
                <PopUp 
                    setOpenModel={setOpenModel}
                    getDonations={getDonations}
                    donate = {donateCampaign}
                    donateFunction = {donate}
                />
            )} 
        </div>
    );
}

export default Campaign;