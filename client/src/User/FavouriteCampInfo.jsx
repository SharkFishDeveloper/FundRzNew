import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import deployedIp from '../IP';

const FavouriteCampInfo = ({ campaign }) => {
    const navigate = useNavigate();
    const [favCampInfo,setFavCampInfo] = useState(null);
    const fetchFavCampHandler = async ()=>{
        try {
          
            const config = {
                withCredentials: true,
              };
            const answer = await axios.get(`http://${deployedIp}:4000/campaign/details/
            ${campaign._id}`,config);
              console.log("frontedn fethcning favourite",answer.data);
              navigate("/campaign/view", { state: { singledatacampaign: answer.data.campaigns } });
              //console.log("reading",answer.data.campaigns);
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        }
    }
    console.log("found done",favCampInfo);
    return (
        <div className="w-64 h-auto mx-12 my-5 bg-gray-200 rounded-xl overflow-hidden shadow-lg p-4 flex flex-col">
          <img
            className="w-full h-48 object-cover mb-4 rounded-md"
            src={campaign.campaignImage}
            alt={campaign.campaignName}
          />
          <div className="mb-2">
            <h2 className="text-xl font-bold">Name - {campaign.campaignName}</h2>
            <p className="text-gray-500">Location - {campaign.campaignLoc}</p>
          </div>
          <p className="text-gray-700 mb-4">Description - {campaign.campaignDesc}</p>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500">{new Date(campaign.campaignDate).toDateString()}</p>
          </div>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded-md mt-auto" onClick={fetchFavCampHandler}>
            Check it out
          </button>
        </div>
      );
}

export default FavouriteCampInfo;