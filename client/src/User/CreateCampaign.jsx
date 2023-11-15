import axios from 'axios';
import React, { useState } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
    const [campaignName,setCampaignName] = useState(""); //* name of campaign
    const [description,setDescription] = useState("");
    const [campaignReason,setCampaignReason] = useState("");
    const [subparticipants,setSubparticipants] = useState(1);
    const [ownerName,setOwnerName] = useState("");
    const [ownerEmail,setOwnerEmail] = useState("");
    const [ownerAddress,setOwnerAddress] = useState("");
    const [campaignAddress,setCampaignAddress] = useState("");
    const [helpEmail,setHelpEmail] = useState("");
    const [campaignSubject,setCampaignSubject] = useState("");
    const [donationTarget,setDonationTarget] = useState(0); //* donation target of camp
    const [imageUrl,setImageUrl] = useState("");

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const navigate = useNavigate();

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        // Reset state when country changes
        setSelectedState('');
      };
    
      const handleStateChange = (value) => {
        setSelectedState(value);
      };

    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("Create campaign clicked");
        const formData = {
            campaignName,
            description,
            campaignReason,
            subparticipants,//* a number
            ownerName,
            ownerEmail,
            ownerAddress,
            campaignAddress,
            helpEmail,
            campaignSubject,
            donationTarget,
            imageUrl,
            selectedCountry,
            selectedState
          };
          console.log("Form Data:", formData);
          if(subparticipants > 15){
            return alert("Not more than 15 participants are allowed!!");
            }
            else if(subparticipants <= 0){
                return alert("Increase participants !!");
            }
            //! turn it on later
        //   for (const key in formData) {
        //     if ((formData[key] === 1 || formData[key] === "")) {
        //       alert(`Please fill in all fields`);
        //       return; 
        //     }
        //   }
        navigate("done",{state:{formData}});
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Create Campaign</h2>
          
          {/* Campaign Name */}
          <div className="mb-4">
            <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">
              Campaign Name
            </label>
            <input
              type="text"
              id="campaignName"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter campaign name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
    
          {/* Campaign Reason */}
          <div className="mb-4">
            <label htmlFor="campaignReason" className="block text-sm font-medium text-gray-700">
              Campaign Reason
            </label>
            <input
              type="text"
              id="campaignReason"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter campaign reason"
              value={campaignReason}
              onChange={(e) => setCampaignReason(e.target.value)}
            />
          </div>
    
          {/* Subparticipants */}
          <div className="mb-4">
            <label htmlFor="subparticipants" className="block text-sm font-medium text-gray-700">
              Subparticipants
            </label>
            <input
              type="number"
              id="subparticipants"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter subparticipants"
              value={subparticipants}
              onChange={(e) => setSubparticipants(parseInt(e.target.value, 10))}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
              Owner name
            </label>
            <input
              type="text"
              id="ownerName"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter owner name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700">
              Owner email
            </label>
            <input
              type="text"
              id="ownerEmail"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter owner email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>

          {/* Owner Address */}
          <div className="mb-4">
            <label htmlFor="ownerAddress" className="block text-sm font-medium text-gray-700">
              Owner Address
            </label>
            <input
              type="text"
              id="ownerAddress"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter owner address"
              value={ownerAddress}
              onChange={(e) => setOwnerAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <CountryDropdown
            id="country"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={selectedCountry}
            onChange={handleCountryChange}
          />
        </div>

        {/* State Dropdown */}
        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <RegionDropdown
            id="state"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            country={selectedCountry}
            value={selectedState}
            onChange={handleStateChange}
          />
        </div>
          <div className="mb-4">
            <label htmlFor="campaignAddress" className="block text-sm font-medium text-gray-700">
              Campaign Address
            </label>
            <input
              type="text"
              id="campaignAddress"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter campaign address"
              value={campaignAddress}
              onChange={(e) => setCampaignAddress(e.target.value)}
            />
          </div>
    
          {/* Help Email */}
          <div className="mb-4">
            <label htmlFor="helpEmail" className="block text-sm font-medium text-gray-700">
              Help Email
            </label>
            <input
              type="email"
              id="helpEmail"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter help email"
              value={helpEmail}
              onChange={(e) => setHelpEmail(e.target.value)}
            />
          </div>
    
          {/* Campaign Subject */}
          <div className="mb-4">
            <label htmlFor="campaignSubject" className="block text-sm font-medium text-gray-700">
              Campaign Subject
            </label>
            <input
              type="text"
              id="campaignSubject"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter campaign subject"
              value={campaignSubject}
              onChange={(e) => setCampaignSubject(e.target.value)}
            />
          </div>
    
          {/* Donation Target */}
          <div className="mb-4">
            <label htmlFor="donationTarget" className="block text-sm font-medium text-gray-700">
              Donation Target
            </label>
            <input
              type="number"
              id="donationTarget"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter donation target"
              value={donationTarget}
              onChange={(e) => setDonationTarget(e.target.value)}
            />
          </div>
    
          {/* Image URL */}
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
    
          {/* Submit Button */}
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      );
}

export default CreateCampaign;