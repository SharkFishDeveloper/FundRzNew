import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import validator from 'validator';
import deployedIp from '../IP';

const CreateCampaignDone = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    // Access the formData from the state
    const formData = location.state.formData;

    const submitHandler = async(e)=>{
        e.preventDefault();
        console.log("Particpants",participants);
        for (const participant of participants) {
            if (!participant.name ||participant.name.length <6 ) {
              return alert("Name cannot be less than 6 alphabets"); 
            }
            if (!participant.email || !validator.isEmail(participant.email)) {
                return alert('Enter a valid email address');
              }
            if(!participant.phoneNumber||participant.phoneNumber.length!==10){
                return alert("Phone number should be 10 digits long ");
            }
            if(!participant.uniqueId ||participant.uniqueId.length !==12)
            return alert("Enter valid unique id ");
          }
        try {
            const config = {
                withCredentials: true,
              };

            const requestData = {
                ...formData,
                participants: participants,
            };
            
            console.log("request data",requestData);
            const response = await axios.post(`http://${deployedIp}:4000/campaign/create-campaign`,{
                requestData
            },config);

            console.log("in create campaign" , response.data);

            if(response.data.message==="Campaign created successfully"){
                navigate("/campaigns");
                alert(response.data.message);
            }
            
        } catch (error) {
            console.log("in catch campaign" , error);
            alert(error.response.data.message);
        }
    };

    const [participants, setParticipants] = useState(
        Array.from({ length: formData.subparticipants }, (_, index) => ({
          name: index === 0 ? formData.ownerName : `Participant ${index+1}`,
          email: index === 0 ? formData.ownerEmail : '',
          phoneNumber: index === 0 ? formData.ownerPhone : '',
          uniqueId: index === 0 ? formData.ownerId : '',
        }))
      );
    
      return (
        <div className="container mx-auto mt-8">
          <div className="text-2xl font-bold mb-4">Create Campaign Done</div>
          
          {/* <div className="mb-2">{formData.subparticipants}</div> */}
    
          {/* Table with headings */}
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Serial No.</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">UniqueId</th>
              </tr>
            </thead>
            <tbody>
              {/* Populate table rows based on participants array */}
              {participants.map((participant, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="py-2 px-4 border-b">{index+1}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={participant.name}
                      onChange={(e) =>
                        setParticipants((prevParticipants) => {
                          const newParticipants = [...prevParticipants];
                          newParticipants[index].name = e.target.value;
                          return newParticipants;
                        })
                      }
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={participant.email}
                      onChange={(e) =>
                        setParticipants((prevParticipants) => {
                          const newParticipants = [...prevParticipants];
                          newParticipants[index].email = e.target.value;
                          return newParticipants;
                        })
                      }
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={participant.phoneNumber}
                      onChange={(e) =>
                        setParticipants((prevParticipants) => {
                          const newParticipants = [...prevParticipants];
                          newParticipants[index].phoneNumber = e.target.value;
                          return newParticipants;
                        })
                      }
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={participant.uniqueId}
                      onChange={(e) =>
                        setParticipants((prevParticipants) => {
                          const newParticipants = [...prevParticipants];
                          newParticipants[index].uniqueId = e.target.value;
                          return newParticipants;
                        })
                      }
                      className="w-full px-2 py-1 border rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          <div className="flex justify-center">
  <button
    onClick={(e) => submitHandler(e)}
    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Create
  </button>
</div>
        </div>
      );

}

export default CreateCampaignDone;