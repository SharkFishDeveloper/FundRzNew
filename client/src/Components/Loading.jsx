import React from 'react'
import { FaSpinner } from 'react-icons/fa';
const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-gray-100 p-8 rounded-md shadow-md">
            <div className="flex items-center justify-center text-blue-500">
              <FaSpinner className="animate-spin mr-2" />
              <h2 className="text-lg font-semibold">Loading...</h2>
            </div>
          </div>
        </div>
      );
}

export default Loading;