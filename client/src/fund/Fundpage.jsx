import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContx/UserContext';
import LoginComponentError from '../Components/LoginComponentError';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import axios from 'axios';
import LoadingFundsPage from '../Components/LoadingFundsPage';

const Fundpage = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [funds,setFunds] = useState(0);
    const {userInfo} = useContext(UserContext);
    const location = useLocation();
    const {campaignId,fundingReceived,name} = location.state;
    console.log(campaignId);
    console.log(fundingReceived);

    const handleSliderChange = (event) => {
        setFunds(event.target.value);
      };
    const handlePayClick = async () => {
        console.log(`Paying ${funds} dollars`);
        
        try {
            const config = {
                withCredentials: true,
              };
              if(funds < 10){
                return alert("Cannot donate less");
              }

            const answer = await axios.put("http://localhost:4000/campaign/fund",{
                campaignId,
                fundAmount:parseInt(funds, 10),
                name
                
            },config);
           setLoading(true);
           setTimeout(()=>{
            setLoading(false);
            navigate("/campaigns");
            alert(answer.data.message);
           },3000);


        } catch (error) {
            alert(error.response.data.message);
            console.log("error donating",error);
        }
      };
    return (
        <>
          {userInfo === "foundUser" ? (
            campaignId ? (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                {!loading ? (<div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
                  <label htmlFor="fundsSlider" className="block text-md font-medium text-gray-700 mb-9">
                    Select Funds: ${funds}
                  </label>
                  <input
                    type="range"
                    id="fundsSlider"
                    name="fundsSlider"
                    min={0}
                    max={fundingReceived}
                    step={1} 
                    value={funds}
                    onChange={handleSliderChange}
                    className="mt-2 mb-5 w-80  bg-gray-500 focus:outline-none focus:ring focus:border-gray-300"
                  />
                  <button
                    onClick={handlePayClick}
                    className="mt-4 px-8 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Pay
                  </button>
                  <p className="text-red-600 text-lg mt-10">
                Disclaimer - It is non-refundable
              </p>
                </div>) : (
              <LoadingFundsPage /> //!make error component
            )}

              </div>
            ) : (
              <Loading /> //!make error component
            )
            ) : (
              <LoginComponentError />
            )}
        </>
      );
}

export default Fundpage;