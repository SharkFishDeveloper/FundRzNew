import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import "./CampaignCard.css";
import { FaArrowUp, FaArrowDown, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { Circle } from 'rc-progress';
import deployedIp from '../IP';


const CampaignCard = ({campaign}) => {
    const navigate = useNavigate();
    const upvoteHandler = async(e)=>{
        e.preventDefault();
        try {     
            const config = {
                withCredentials: true,
              };         
        console.log("CLiked liked",campaign._id);
        const response = await axios.put(`http://${deployedIp}:4000/campaign/edit/upvote`, { campaignId: campaign._id },config);
        alert(response.data.message);
        console.log("error",response.data);
        } catch (error) {
            alert(error.response.data.message);
            console.error("Error in try:", error);
        }
        
    }

    const downvoteHandler = async(e)=>{
        e.preventDefault();
        try {     
            const config = {
                withCredentials: true,
              };         
        console.log("CLiked liked",campaign._id);
        const response = await axios.put(`http://${deployedIp}:4000/campaign/edit/downvote`, { campaignId: campaign._id },config);
        alert(response.data.message);
        console.log("error",response.data);
        } catch (error) {
            alert(error.response.data.message);
            console.error("Error in try:", error);
        }
        
    }

    const detailsHandler = (e)=>{
        console.log("clicked details page");
        navigate("/campaign/view", { state: { singledatacampaign: campaign } });
    }

    const followHandler = async (e)=>{
        console.log("Clicked follow story");
        try {
            const config = {
                withCredentials: true,
              }; 
            const response = await axios.put(`http://${deployedIp}:4000/campaign/edit/follow`, { 
            campaignId: campaign._id,
            campaignName:campaign.campaignName,
            campaignImage:campaign.imageUrl,
            campaignDesc:campaign.description,
            campaignDate:campaign.createdOn,
            campaignLoc:campaign.selectedCountry       
            },config);
            alert(response.data.message);
            console.log(response);
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    };
    const progressPercentage = ((campaign.fundingReceived / campaign.donationTarget) * 100).toFixed(2);
    return (
        <>
        <div className="outerBox">
            <div className="card">
                <div className="A-details flex  justify-between">
                <div id='#by' className="">
                <span className="font-bold " >
                Name of campaign - {campaign.campaignName}
                </span>
                </div>
                    <div className="mt-0">
                    <span >By - {campaign.ownerName}</span>
                    {campaign.isVerified && (
                <IoMdCheckmarkCircle className="text-green-600 ml-20" size={30} />
                )}
                </div>
                
                </div>

                <div className="createdOn">
                    Created on - {campaign.createdOn.substring(0,10)}
                </div>
                <div className="participants">
                Participants - {campaign.participants.length}
                </div>
                <div className="subject">
                    Subject - {campaign.campaignSubject}
                </div>
                <div className="description">
                    Description - {campaign.description}
                </div>
                
                <div className="loaction">
                    Loaction - {campaign.selectedCountry}
                </div>
                <div className="imageContainer">
                    <img src={campaign.imageUrl} />
                </div>

                <div className="flex items-center m-4">
                <div className="relative w-20 h-20 hover:scale-110 transition-transform">
        <Circle
          percent={progressPercentage}
          strokeWidth={8} // Adjust the thickness of the circle as needed
          strokeColor="#8d3de3" // Customize the color as needed
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-bold text-black">
            {progressPercentage}%
          </div>
        </div>
      </div>
            </div>

                <div className="votes">
                    <button onClick={(e)=>upvoteHandler(e)}>
                    <FaArrowUp  style={{ color: 'green' }}/>
                    <span style={{ marginLeft: '8px' }}>Upvote</span>
                    <span style={{ marginLeft: '8px' }}>{campaign.upvotes}</span>
                        </button>

                    <button onClick={(e)=>downvoteHandler(e)}>
                    <FaArrowDown style={{ color: 'red' }}/>
                    <span style={{ marginLeft: '8px' }}>Downvote</span>
                    <span style={{ marginLeft: '8px' }}>{campaign.downvotes}</span>
                    </button>
                    </div>



                    <button className='viewDetailsButton' onClick={detailsHandler} >
                    <FaInfoCircle />                        
                    <span style={{ marginLeft: '8px' }}>View more details</span>
                    </button> 
                    <div className='followbtndiv'>
                    <button className="followButton" onClick={followHandler}>
                    <FaHeart />
                    </button>
                    </div>
                    
                          
                    </div>
                 </div>
                </>
      );
}

export default CampaignCard;