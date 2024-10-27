import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContx/UserContext';
import Loading from '../Components/Loading';
import LoginComponentError from '../Components/LoginComponentError';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import deployedIp from '../IP';

const UserProfileUpdate = () => {
    const navigate = useNavigate();
    const {userInfo} = useContext(UserContext);

    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [imageUrl,setImageUrl] = useState("");

    const location = useLocation();
    const { createdCamaigns } = location.state;



    const handleUpdate = async() => {
        console.log("cliked");
        try {
            const config = {
                withCredentials: true,
              };
          const response = await axios.put(`http://${deployedIp}:4000/user/updateProfile`,
          {
            name,
            email,imageUrl
          },config);
          console.log("on campaign page",response.data.message);
          navigate("/user/profile");
          alert(response.data.message);
          
        } catch (error) {
            console.log("error",error);
            alert(error.response.data.message.message);
        }
    };

    return (
        <>
          {userInfo === 'foundUser' ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                <div className="text-center mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Set new name"
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="New email"
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="w-full p-2 mb-4 border rounded-md"
                  />
                </div>
                {imageUrl && (
                  <div className="flex items-center justify-center mt-4">
                    <img
                      src={imageUrl}
                      alt="Image Preview"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <span className="ml-2">Profile image Preview</span>
                  </div>
                )}
                {createdCamaigns.length>0  && (
              <p className="text-red-500 text-sm mt-4">
                You cannot update your profile because you have started campaigns.
              </p>
                )}
                <button
                 disabled={createdCamaigns.length>0}
                  className="bg-green-500 text-white px-4 py-2 rounded-full mt-2 hover:bg-green-600 transition duration-300 ease-in-out"
                  onClick={handleUpdate}
                >
                  Update Profile
                </button>
              </div>
            </div>
          ) : (
            <LoginComponentError />
          )}
        </>
      );
}

export default UserProfileUpdate;