import {BrowserRouter as Router,Routes,Route, useLocation} from "react-router-dom";
import SignUp from "./User/SignUP.jsx";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Login from "./User/Login.jsx";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

 function App() {
  const [userMessage, setuserMessage] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          withCredentials: true,
        };
        const response = await axios.get("http://localhost:4000/user/details",config);
        setuserMessage(response.data.message); 
        console.log("this is sent",userMessage);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  useEffect(() => {
    console.log("this is sent",userMessage);
  }, [userMessage]);
  
  

  return (
    <div className="App">
      <Router>
        <Header message = {userMessage}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


  //const [getToken, setgetToken] = useState("");

  // useEffect(() => {
  //   const fztoken = Cookies.get('fztoken');
  //   if (fztoken) {
  //     setgetToken(fztoken);
  //     console.log("Fetch cookie", fztoken);
  //     console.log("setState", fztoken);
  //   }else{
  //     console.log("no cooke");
  //   }
  // }, []);