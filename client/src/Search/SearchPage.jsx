import axios from 'axios';
import React, { useState } from 'react'
import SearchResultsCard from "./SearchResultsCard.jsx";
import NoResultsFound from "./NoResultsFound.jsx";
import Loading from '../Components/Loading.jsx';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [searchTerm,setSearchTerm] = useState("");
    const [data,setData] = useState([]);
    const [noresult,setNoResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const resultHandler = async()=>{
        setNoResult(false);
        setLoading(true);
        if(searchTerm.length===0){
            setNoResult(true);
        }
        try {
            const config = {
                withCredentials: true,
              };
          const response = await axios.get(`http://localhost:4000/campaign/search?searchTerm=${searchTerm}`,config);
          if(response.data.data.length === 0){
            setNoResult(true);
            setLoading(false);
          }
          setData(response.data.data);
          console.log("search result",response.data.data);
          setLoading(false);
        } catch (error) {
            alert(error.response.data.message);
            navigate("/login");
            console.log("error search",error.response.data.message);
        }
    }
    console.log("data",setData);
    return (
        <div className="max-w-screen-md mx-auto p-4">
        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search campaigns..."
            className="border p-2 flex-1"
          />
          <button onClick={resultHandler} className="ml-2 bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </div>
  
        {/* Search Results */}
        {data.length>0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Search results for :{searchTerm}</h3>
            
            {data.map(campaign => (
              <SearchResultsCard key={campaign._id} campaign={campaign} />
            ))}
          </div>          
        )}
        {loading && (<Loading/>)}
        {
            noresult && (<NoResultsFound searchTerm={searchTerm}/>)
        }
      </div>
    );
}

export default SearchPage;