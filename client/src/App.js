import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from "./User/SignUP.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
