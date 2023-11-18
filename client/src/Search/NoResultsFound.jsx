import React from 'react'
import { FaSadTear } from 'react-icons/fa';
const NoResultsFound = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="bg-gray-100 p-8 rounded-lg">
            <FaSadTear className="text-5xl text-red-500 mb-4" />
            <p className="text-2xl font-bold text-gray-800 mb-2">
              Oops! No Results Found :
            </p>
            <p className="text-gray-600">Try a different search term or refine your query.</p>
          </div>
        </div>
      );
}

export default NoResultsFound