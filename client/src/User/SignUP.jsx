import React, { useContext, useState } from 'react'
import axios from "axios";
import "./SignUP.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContx/UserContext';


const SignUP = () => {

  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {setuserInfo} = useContext(UserContext);
  const signupHandler = async(e)=>{
    e.preventDefault();
    console.log("Clicked signup");
    if(password.length<=5){
     return alert("Password is too small");
    }
    const config = {
      withCredentials: true,
    };
    try {
      const answer = await axios.post("http://localhost:4000/registration/signup",{
      email,
      name,
      password
    },config);

    if(answer.data.message==="User created"){
      setuserInfo(answer.data.message);
      navigate("/");
      //window.location.reload();//! find solution for this
    }else{
      alert(answer.data.message);
    }
    console.log(answer.data.message|| "Signup successfull");
    //localStorage.setItem("userIdS",answer.data.userID);
    } catch (error) {
      console.error(error.message); 
      alert( error.response.data.message||"An error occurred");
    }
  }
  return (
    <div className="signup-container bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto my-auto mt-40">
      <div className="signup-header text-3xl font-bold mb-4">Sign Up</div>
      <form className="signup-form space-y-4">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          className="w-full p-3 border rounded-md"
        />
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
          onClick={signupHandler}
          className="w-full bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUP;