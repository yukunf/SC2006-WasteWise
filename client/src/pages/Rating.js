import React, { useState, useEffect} from "react";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";
import {Link} from 'react-router-dom';

const Rating = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index);
    };

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collectorName, setCollectorName] = useState(1);

    const handleSelectChange = (event) => {
        setCollectorName(event.target.value);
      };

    //just company names from API (for selection of company during reg)
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_26afdd562f28b4acecb400c10b70f013&limit=314');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                const companyNames = json.result.records.map(record => record.company_name); // Adjust the key based on the actual data structure
                setCompanies(companyNames);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    console.log("this", companies)
    //For loading and if theres error
    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full h-full">
            <Navbar_GeneralUser/>
            <div className="flex flex-col bg-[#016a70] h-[20vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}></div>
            <div className="mt-20 pl-20">
                <p className="text-lg text-bold text-left pl-20">Collector Name</p>
                <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1">
                <div className="relative">
                            <select className="text-sm  w-full p-1.5 mt-1 focus:outline-none"
                            value={collectorName}  // This binds the selected value to the state
                            onChange={handleSelectChange}  // Updates state when an option is selected
                            >
                                <option value="" disabled selected>
                                    <span className="text-gray-400">Please choose a company</span>
                                </option>
                                {/* create options of companies */}
                                {companies.map((company, index) => (
                                    <option key={index} value={company}>
                                        {company}
                                    </option>
                                ))}
                            </select>
                        </div>
                </div>
                <p className="text-lg text-bold text-left pl-20 mt-12">Give your ratings</p>
                <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                            key={star}
                            onClick={() => handleStarClick(star)}
                            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            style={{ marginRight: '25px' }}
                        >★
                        </span>
                    ))}
                </div>
                <div className="mt-12">
                    <p className="text-lg text-bold text-left pl-20 mt-12">Comments</p>
                    <div className="flex items-center">
                        <textarea className="mr-12 w-[42%] mt-1 p-2 border border-grey-300 rounded" rows="4" placeholder="Enter your comments" style={{ marginLeft: '3%' }}></textarea>
                        <button className="mt-12 ml-12 mr-12 rounded-lg bg-[#016A70] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium" onClick={() => alert('Submitted!')}>Submit</button>
                        <Link to={`/userreport/${collectorName}`}><button className="mt-12 ml-12 rounded-lg bg-[#419296] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">Report</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rating;