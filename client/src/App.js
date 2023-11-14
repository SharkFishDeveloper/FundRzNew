import {BrowserRouter as Router,Routes,Route, useLocation} from "react-router-dom";
import SignUp from "./User/SignUP.jsx";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Login from "./User/Login.jsx";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

 function App() {
  
  
  
  return (
    <div className="App">
      <Router>
        <Header />
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