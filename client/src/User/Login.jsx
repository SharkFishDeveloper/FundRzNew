import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContx/UserContext';
import deployedIp from '../IP';

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {setuserInfo,userInfo} = useContext(UserContext);
    const loginHandler = async(e)=>{
    e.preventDefault();
    console.log("Clicked login");
    const config = {
      withCredentials: true,
    };

    try {
      const answer = await axios.post(`http://${deployedIp}:4000/registration/login`,{
      email,
      password
    },config);

    if(answer.data.message==="logged in successfully"){
      setuserInfo(answer.data.message);
      navigate("/");   
      //window.location.reload();//! find solution for this
    }else{
        alert(answer.data.message);
    }
    console.log('Token:', answer.data.token);
    console.log('UserID:', answer.data.userID);
    //localStorage.setItem('userId',answer.data.userID);
    } catch (error) {
      console.error(error.message); 
      alert( error.response.data.message||"An error occurred");
    }
  }
  return (
    <div className="signup-container bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto my-auto mt-40">
      <div className="signup-header text-3xl font-bold mb-4">Log-in</div>
      <form className="signup-form space-y-4">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="w-full p-3 border rounded-md"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="w-full p-3 border rounded-md"
        />
        <button
          onClick={loginHandler}
          className="w-full bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700"
        >
          Log in
        </button>
      </form>
    </div>
  );
  }

export default Login;