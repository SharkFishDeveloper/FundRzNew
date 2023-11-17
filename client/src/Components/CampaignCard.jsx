import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import "./CampaignCard.css";
import { FaArrowUp, FaArrowDown, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';


const CampaignCard = ({campaign}) => {
    const navigate = useNavigate();
    const upvoteHandler = async(e)=>{
        e.preventDefault();
        try {     
            const config = {
                withCredentials: true,
              };         
        console.log("CLiked liked",campaign._id);
        const response = await axios.put("http://localhost:4000/campaign/edit/upvote", { campaignId: campaign._id },config);
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
        const response = await axios.put("http://localhost:4000/campaign/edit/downvote", { campaignId: campaign._id },config);
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
            const response = await axios.put("http://localhost:4000/campaign/edit/follow", { 
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

    return (
        <>
        <div className="outerBox">
            <div className="card">
                <div className="A-details">
                    Name of campaign - {campaign.campaignName}
                    <div className="" id='#by' >
                    By - {campaign.ownerName}
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
                <div className="progressBar">
                <ProgressBar completed={500} maxCompleted={campaign.donationTarget} />
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