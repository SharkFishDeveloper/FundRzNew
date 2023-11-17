import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa';

const LoginComponentError = () => {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-gray-200 p-8 rounded-md shadow-lg">
            <div className="flex items-center justify-center text-red-500">
              <FaExclamationCircle className="mr-2" />
              <h2 className="text-lg font-semibold">Login Required</h2>
            </div>
            <p className="text-gray-600 mt-4">
              Please log in to continue and access the content.
            </p>
            {/* Your login form or button can go here */}
          </div>
        </div>
      );
}

export default LoginComponentError;