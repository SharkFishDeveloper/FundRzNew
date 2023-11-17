import React from 'react'
import { FaRegSadTear } from 'react-icons/fa';

const NothingPage = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className=" max-w-md w-full text-center text-gray-700 bg-gray-200 p-8 rounded-lg">
            <FaRegSadTear className="text-6xl mb-4 text-gray-700" />
            <p className="text-xl mb-2">Oops, nothing in favourites.</p>
            </div>
            </div>
        </div>
      );
}

export default NothingPage;