import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from "./User/SignUP.jsx";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import Login from "./User/Login.jsx";
import { UserContextProvider } from "./UserContx/UserContext.js";
import CreateCampaign from "./User/CreateCampaign.jsx";
import CreateCampaignDone from "./User/CreateCampaignDone.jsx";
import Campaigns from "./User/Campaigns.jsx";
import CampaignDetailsPage from "./User/CampaignDetailsPage.jsx";
import Favourite from "./User/Favourite.jsx";
import UserProfile from "./User/UserProfile.jsx";
 function App() {
  
  
  
  return (
    <div className="App">
      <UserContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create-campaign" element={<CreateCampaign/>}/>
          <Route path="/create-campaign/done" element={<CreateCampaignDone />}/>
          <Route path="/campaigns" element={<Campaigns />}/>
          <Route path="/campaign/view" element={<CampaignDetailsPage />}/>
          <Route path="/favourites" element={<Favourite />}/>
          <Route path="/user/profile" element={<UserProfile />}/>
        </Routes>
      </Router>
      </UserContextProvider>
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