import React from 'react'
import { FaRegMeh } from 'react-icons/fa';
import { MdInfo } from 'react-icons/md';
const Nothing = () => {
    return (
        // <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center text-gray-700 bg-gray-200 p-8 rounded-lg">
            <FaRegMeh className="text-6xl mb-4 text-gray-700" />
            <p className="text-xl mb-2">Oops, nothing here.</p>
            {/* Add any additional message or content as needed */}
          </div>
        //</div>
      );
}

export default Nothing;