import React, { useContext, useState } from "react";
import axios from "axios";
import {WebDataContext} from '../context/dataContext'
function InputSection() {
  const [url, setUrl] = useState("");
  const [totalUrl, setTotalUrl] = useState([]);
  const [error, setError] = useState("");
  const {data,setData,setloading}=useContext(WebDataContext)

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

 
  function addUrl() {
    
    if (!url.trim()) {
      setError("URL cannot be empty.");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    setTotalUrl([...totalUrl, url]);
    setUrl("");
    setError("");
  }

 
  async function analyzeUrls() {
    setloading(true)
    if (totalUrl.length === 0) {
      setError("Please add at least one URL to analyze.");
      return;
   }
    console.log("Analyzing URLs:", totalUrl);
    try {
      const response = await axios.post('http://localhost:4000/analyze', {
        data:totalUrl
      })
      console.log("respomse dddd   ", response.data.results);
      setloading(false)
      setData(response.data.results);
    } catch (error) {
      setloading(false)
      console.log(error);
    }
   
    
  }

  return (
    <div className="flex items-center justify-center  ">
      <div className="border-2 border-slate-900 shadow-lg shadow-slate-900 rounded-lg p-6 w-[90%] max-w-[600px]">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          WEB PAGE WORD COUNTER
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 ">
          {/* Input field */}
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the URL"
            className="flex-grow border-2  border-blue-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Add URL button */}
          <button
            onClick={addUrl}
            className="min-w-[100px] mt-2 sm:mt-0 md:w-32 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-fuchsia-900 hover:border-2 hover:border-amber-700 transition"
          >
            Add URL
          </button>
        </div>
        {error && <p className="text-amber-900 text-sm mt-2">{error}</p>}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">URLs Added:</h2>
          <ul className="list-disc pl-5">
            {totalUrl.map((urlItem, index) => (
              <li key={index} className="text-gray-600 text-sm">
                {urlItem}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={analyzeUrls}
          className="w-full bg-violet-950 text-white py-2 px-4 rounded-lg hover:bg-fuchsia-900 hover:border-2 hover:border-amber-700  transition-transform mt-4"
        >
          Analyze URLs
        </button>
      </div>
    </div>
  );
}

export default InputSection;
