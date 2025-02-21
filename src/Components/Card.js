import React, { useEffect } from "react";

const Card = ({ allCampaign, setOpenModel, setDonate, title }) => {
  // Function to calculate days left until the campaign deadline
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };

  const weiToEth = (wei)=>{
    return (Number(wei)/10 ** 18).toFixed(4);
  }

  useEffect(() => {
    console.log("Campaign Data:", allCampaign); // Log the campaign data for debugging
  }, [allCampaign]);

  return (
    <div className="px-4 py-16 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {allCampaign?.map((campaign, i) => (
          <div
            key={i}
            onClick={() => {
              setDonate(campaign);
              setOpenModel(true);
            }}
            className="cursor-pointer border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">
                Days Left: {daysLeft(campaign[3])}
              </p>
              <p className="text-sm font-semibold text-gray-500">
              Account No :{campaign[0]} {/* Campaign title */}
              </p>
              <h3 className="text-xl font-bold text-gray-900 break-words">
                Title :{campaign[1]} {/* Campaign title */}
              </h3>
              <p className="text-gray-700 mt-2 break-words">
                Description :{campaign[2]} {/* Campaign description */}
              </p>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <p className="break-words truncate">
                Target: {weiToEth(campaign[3]._hex)} ETH {/* Target amount */}
              </p>
              <p className="break-words truncate">
                Raised: {weiToEth(campaign[5]._hex)} ETH {/* Raised amount */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;