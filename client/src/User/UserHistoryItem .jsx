import React from 'react'

const UserHistoryItem = ({ name, fundAmount, date }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-bold mb-2">Campaign name - {name}</p>
          <p className="text-gray-700">Fund Amount: {fundAmount}</p>
          <p className="text-gray-700">Date: {new Date(date).toLocaleString()}</p>
        </div>
      );
  };
  
  

export default UserHistoryItem 