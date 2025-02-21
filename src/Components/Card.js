import React, { useEffect } from "react";

const Card = ({ allCampaign, setOpenModel, setDonate, title }) => {
  // Function to calculate days left until the campaign deadline
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };

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
                Days Left: {daysLeft(campaign.deadline)}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                Account No: {campaign.owner} {/* Campaign owner */}
              </p>
              <h3 className="text-xl font-bold text-gray-900 break-words">
                Title: {campaign.title} {/* Campaign title */}
              </h3>
              <p className="text-gray-700 mt-2 break-words">
                Description: {campaign.description} {/* Campaign description */}
              </p>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <p className="break-words truncate">
                Target: {campaign.target} ETH {/* Target amount */}
              </p>
              <p className="break-words truncate">
                Raised: {campaign.amountCollected} ETH {/* Raised amount */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;