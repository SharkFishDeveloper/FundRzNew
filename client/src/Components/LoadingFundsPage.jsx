import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import { IoIosFlash } from 'react-icons/io';
const LoadingFundsPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-gray-300 p-8 rounded-md shadow-md">
            <div className="flex items-center justify-center text-blue-500">
              <IoIosFlash
                className="text-4xl animate-flash"
              />
              <h2 className="text-lg font-semibold ml-2">Just a moment...</h2>
            </div>
          </div>
          <style jsx>{`
            @keyframes flash {
              0%, 50%, 100% {
                opacity: 1;
              }
              25%, 75% {
                opacity: 0;
              }
            }
    
            .animate-flash {
              animation: flash 3s infinite;
            }
            
          `}</style>
        </div>
      );
}

export default LoadingFundsPage;