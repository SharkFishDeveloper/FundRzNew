import React from 'react'
import { MdCheckCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SearchResultsCard = ({campaign}) => {
    const navigate = useNavigate();
    const dataHandler = ()=>{       
        console.log("click");
        try {
            navigate("/campaign/view", { state: { singledatacampaign: campaign} }); 
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="max-w-sm mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 mb-8" onClick={dataHandler}>
          <img className="w-full h-40 object-cover" src={campaign.imageUrl} alt={campaign.campaignName} />
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">Name - {campaign.campaignName}</h2>
            {campaign.isVerified && (
            <MdCheckCircleOutline className="text-green-500 w-6 h-6 mb-2"  title="Verified" />
          )}
            <p className="text-gray-600 mb-2 font-semibold">Description - {campaign.description}</p>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Owner:</span> {campaign.ownerName}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Email:</span> {campaign.ownerEmail}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Address:</span> {campaign.campaignAddress}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Created On :</span> {campaign.createdOn.substring(0,10)}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Donation Target:</span> {campaign.donationTarget}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">Participants:</span> {campaign.participants.length}
            </div>
            {/* Add more fields as needed */}
          </div>
        </div>
      );
}

export default SearchResultsCard;