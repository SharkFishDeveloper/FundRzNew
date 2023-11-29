import React from 'react'
import { useLocation } from 'react-router-dom';
import UserHistoryItem from './UserHistoryItem ';


const Userhistory = () => {
    const location = useLocation();
    const {history} = location.state;
    return (
        <div className="bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-4">User History</h1>
          
          {history && history.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <UserHistoryItem
                  key={item._id}
                  name={item.name}
                  fundAmount={item.fundAmount}
                  date={item.Date}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No history available</p>
          )}
        </div>
      );
}

export default Userhistory