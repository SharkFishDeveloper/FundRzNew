import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CampaignCard from '../Components/CampaignCard';
import LoginComponentError from "../Components/LoginComponentError.jsx";
import Loading from '../Components/Loading.jsx';
import deployedIp from '../IP.js';

const Campaigns = () => {
    console.log(" start");
    const [error,setError] = useState(null);

   const [campaignDetails,setCampaignDetails] = useState(null);
    useEffect(()=>{
        const fetchData = async () => {
        try {
            const config = {
              withCredentials: true,
            };
            
        const response = await axios.get(`http://${deployedIp}:4000/campaign/details`,config);
        console.log("on campaign page",response.data.message);
        setCampaignDetails(response.data);
        }
        catch(error){
            setError(error.response.data.message);
            alert(error.response.data.message);
            console.log("error campaign page",error);
        }
    };
    fetchData();
    },[]);

  return (
    <>
    {campaignDetails && campaignDetails.success ? (
    <div>
    {campaignDetails.campaigns.map((campaign) => (
    <div key={campaign._id}>
        {/* Place your CampaignCard component here */}
        <CampaignCard campaign={campaign} />
    </div>
        ))}
    </div>
    ): error && (error === "Log in to continue") ? (
        <LoginComponentError />
      )  : (<Loading/>)}
    </>
  )
}

export default Campaigns;