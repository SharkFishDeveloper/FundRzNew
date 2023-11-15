import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <>   
    <div>Home</div>
    <button>
      <Link to="/create-campaign">Create-campaign</Link>
    </button>   
    </>

  )
}

export default Home;