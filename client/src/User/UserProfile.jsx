import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContx/UserContext';
import Loading from '../Components/Loading';
import LoginComponentError from '../Components/LoginComponentError';
import NothingPage from '../Components/NothingPage';
import Nothing from '../Components/Nothing';
import { useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import deployedIp from '../IP';

const UserProfile = () => {
    const navigate = useNavigate();
    const {userInfo} = useContext(UserContext);
    const [user,setUser] = useState("");
    useEffect(()=>{
        const profileHandler = async()=>{
            
          try {
            const config = {
                withCredentials: true,
              };
            const response = await axios.get(`http://${deployedIp}:4000/user/profile`,config);
            setUser(response.data.message);
            console.log("userprofile",response.data.message);
          } catch (error) {
            console.log(error);
          }
        }
        profileHandler();

    },[]);
    
    const handleClick = async(campaignId)=>{
        try {
            const config = {
                withCredentials: true,
              };
            const answer = await axios.get(`http://${deployedIp}:4000/campaign/details/
            ${campaignId}`,config);
              console.log("frontedn fethcning favourite",answer.data);
              navigate("/campaign/view", { state: { singledatacampaign: answer.data.campaigns } });
              //console.log("reading",answer.data.campaigns);
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        }
    }

    const handleEditProfile = ()=>{
      console.log("edit user profile");
      navigate("update", { state: { createdCamaigns: user.createdCampaigns } });
    }

    console.log("user",user);
    return (
        <>
          {userInfo === "foundUser" ? (
            user ? (
              <>
                <div className="mb-4 text-center mt-4">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-500 mt-3">{user.email}</p>
                  {user.joinedOn && (<p className="text-gray-500 mt-3">Joined on - {user.joinedOn.substring(0,10)}</p>)}
                  {user.amountFunded && (
                  <p className="text-gray-800 mt-3 font-bold">Amount donated - $ {user.amountFunded}</p>
                  )}
                  {user.imageUrl && (
                <div className="flex items-center justify-center mt-3">
                  <img
                    className="w-20 h-20 object-cover rounded-full"
                    src={user.imageUrl}
                    alt={`${user.name}'s Profile`}
                  />
                </div>
              )}
               <button
                className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={() => handleEditProfile()}
              >
                Edit profile
              </button>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-2">Following Campaigns</h3>
      
                    {user.followingCampaigns.length > 0 ? (
                      <div className="flex flex-wrap -mx-2">
                        {user.followingCampaigns.map((campaign) => (
                          <div key={campaign._id} className="mb-4 mx-5">
                            <img
                              className="w-32 h-40 object-cover mb-2 rounded-md"
                              src={campaign.campaignImage}
                              alt={campaign.campaignName}
                            />
                            <h4 className="text-lg font-bold mb-1">Name - {campaign.campaignName}</h4>
                            <p className="text-gray-600">Location: {campaign.campaignLoc}</p>
                            <p className="text-gray-600">{new Date(campaign.campaignDate).toDateString()}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Nothing />
                    )}
                  </div>
                </div>
      
                {/* Display created campaigns or message if no campaigns */}
                <div className="my-8 mx-4">
                  {user.createdCampaigns.length>0 && (<h3 className="text-2xl font-semibold mb-6 mt-8">Created Campaigns</h3>)}
      
                  {user.createdCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                      {user.createdCampaigns.map((campaign) => (
                        <div key={campaign._id} className="mb-8" onClick={() => handleClick(campaign._id)}>
                          <div className="relative overflow-hidden rounded-md shadow-lg">
                            <img
                              className="w-full h-48 object-cover rounded-t-md"
                              src={campaign.campaignImage}
                              alt={campaign.campaignName}
                            />
                            <div className="p-4 bg-gray-800 text-white">
                              <h4 className="text-xl font-bold mb-2">{campaign.campaignName}</h4>
                              <p className="text-gray-300 mb-2">Location: {campaign.campaignLoc}</p>
                              <p className="text-gray-300">
                                Date: {new Date(campaign.campaignDate).toLocaleDateString()}
                              </p>
                              {/* Add more details if needed */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <FaExclamationCircle className="text-red-500 text-4xl mb-2 mt-8" />
                        <p className="text-gray-600">You have not created any campaigns yet.</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Render something when user is not found
              <div> User not found </div>
            )
          ) : (
            // Render something when userInfo is not "foundUser"
            <LoginComponentError/>
          )}
        </>
      );
      
      
}

export default UserProfile;