import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 flex flex-col items-center justify-center">
        
        {/* Website Name and Other Messages */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-blue-500 mb-2 mt-4">Fund-Raiser</h1>
          <p className="text-gray-600">Your go-to platform for creating and supporting exciting fundraising campaigns.</p>
        </div>

        {/* Image and Introduction */}
        <div className="max-w-x bg-white p-8 rounded-md shadow-md mb-6 flex items-center p-3">
          <img
            className="mr-20 rounded-lg shadow-lg"
            src="https://img.freepik.com/premium-photo/world-environment-earth-day-concept-with-globe-nature-eco-friendly-environment-ai-generated_342644-1058.jpg"
            alt="FunRaiser Campaign"
          />
          
          <p className="text-gray-700">
          <p className="text-gray-600 font-bold text-3xl mb-20">
            Welcome to FunRaiser! Join us in making a difference.
          </p>
            FunRaiser is your go-to platform for creating and supporting exciting fundraising campaigns.
            Explore our services and discover how you can make a difference in the causes you care about.
            Whether you're an individual passionate about making a difference or a nonprofit organization seeking support, FunRaiser provides the tools and community you need to achieve your fundraising goals.

With a user-friendly interface, creating a campaign on FunRaiser is a breeze. Tell your story, set fundraising goals, and engage with your supporters. Launching a campaign has never been this accessible.

Discover a world of meaningful causes and be a part of positive change. Browse and support campaigns aligned with your values. From medical expenses to community projects, every contribution counts.

          </p>
         
        </div>
        <div className="flex">
          <button className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:shadow-outline-blue mb-6 mr-4">
          <Link to="/campaigns">Go to Campaigns</Link>
          </button>
          <button className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:shadow-outline-blue mb-6">
          <Link to="/create-campaign">Create-campaign</Link>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-md">
            {/* Add your own icon or use an external library like react-icons */}
            <span className="text-5xl">🚀</span>
            <h2 className="text-xl font-bold my-2">Start a Campaign</h2>
            <p>Launch your own fundraising campaign and make an impact.</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-md">
            <span className="text-5xl">🌍</span>
            <h2 className="text-xl font-bold my-2">Support Causes</h2>
            <p>Discover and support campaigns that align with your values.</p>
          </div>
        </div>

        <footer className="text-gray-600">
          © 2023 FunRaiser. All rights reserved.
        </footer>

      </div>
    </div>
  );
}

export default Home;