import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContx/UserContext';
import Loading from '../Components/Loading';
import LoginComponentError from '../Components/LoginComponentError';
import NothingPage from '../Components/NothingPage';
import Nothing from '../Components/Nothing';

const UserProfile = () => {
    const {userInfo} = useContext(UserContext);
    const [user,setUser] = useState("");
    useEffect(()=>{
        const profileHandler = async()=>{
            
          try {
            const config = {
                withCredentials: true,
              };
            const response = await axios.get("http://localhost:4000/user/profile",config);
            setUser(response.data.message);
            console.log("userprofile",response.data.message);
          } catch (error) {
            console.log(error);
          }
        }
        profileHandler();

    },[]);
    console.log("user",user);
  return (
    <>
    {userInfo==="foundUser" ? 
    (user ? (
        <>
         <div className="mb-4 text-center mt-4">
    <h2 className="text-2xl font-bold">{user.name}</h2>
    <p className="text-gray-500 mt-3">{user.email}</p>
  </div>
  <div className="flex flex-col items-center">
  <div className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-6">
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
  
  <div className="my-8 mx-4"> {/* Added margin to the entire component */}
      <h3 className="text-2xl font-semibold mb-6 mt-8">Created Campaigns</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {user.createdCampaigns.map((campaign) => (
          <div key={campaign._id} className="mb-8">
            <div className="relative overflow-hidden rounded-md shadow-lg">
              <img
                className="w-full h-48 object-cover rounded-t-md"
                src={campaign.campaignImage}
                alt={campaign.campaignName}
              />
              <div className="p-4 bg-gray-800 text-white">
                <h4 className="text-xl font-bold mb-2">{campaign.campaignName}</h4>
                <p className="text-gray-300 mb-2">Location: {campaign.campaignLoc}</p>
                <p className="text-gray-300">Date: {new Date(campaign.campaignDate).toLocaleDateString()}</p>
                {/* Add more details if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
        
    ):(<Loading/>)
    )
    :(<LoginComponentError/>)}
    </>
  )
}

export default UserProfile;