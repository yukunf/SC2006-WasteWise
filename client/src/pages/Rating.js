import React, { useState, useEffect} from "react";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";
import {Link, useNavigate} from 'react-router-dom';


const Rating = () => {
    const [rating, setRating] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collectorId, setCollectorId] = useState(""); // Store the collector ID

    
    const handleStarClick = (index) => {
        setRating(index);
    };

    const handleSelectChange = (event) => {
        setCollectorId(event.target.value);
    };

    // Fetch company names and IDs from API
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/collectors`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    // console.log('Collector details:', data);
                    const companyDetails = data.map(record => ({
                        id: record.id,
                        name: record.name,
                    }));
                    setCompanies(companyDetails)
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error); 
            } finally {
                setLoading(false); // Ensure loading is set to false after fetch attempt
            }
        }

        fetchCompanies();

    }, []);
    
    const handleSubmit = async () => {
        const comments = document.querySelector('textarea').value;
    
        if (!rating || !comments || !collectorId) {
            alert("Please provide a rating, comments, and select a collector.");
            return;
        }
    
        const ratingData = {
            collectorID: collectorId,
            rating: rating,
            comments: comments,
            userID: localStorage.getItem('user_id'),
            created_at: new Date().toISOString()
        };
    
        try {
            const response = await fetch('http://localhost:8000/api/ratings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRFToken': getCSRFToken(),
                    'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
                },
                credentials: 'include',  // This ensures cookies (session) are included in the request
                body: JSON.stringify(ratingData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Status:', response.status);
                console.error('Error Details:', errorData);
                alert('An error occurred: ' + (errorData.detail || errorData.message));
            } else {
                alert('Rating submitted successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the rating.');
        }
    };

    // console.log("companies id", companies)
    console.log("col id", collectorId)
    
    
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full h-full">
            <Navbar_GeneralUser />
            <div className="flex flex-col bg-[#016a70] h-[20vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}></div>
            <div className="mt-20 pl-20">
                <p className="text-lg text-bold text-left pl-20">Collector Name</p>
                <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1">
                    <div className="relative">
                        <select
                            className="text-sm w-full p-1.5 mt-1 focus:outline-none"
                            value={collectorId}
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled>
                                <span className="text-gray-400">Please choose a company</span>
                            </option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
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
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className="mt-12">
                    <p className="text-lg text-bold text-left pl-20 mt-12">Comments</p>
                    <div className="flex items-center">
                        <textarea
                            className="mr-12 w-[42%] mt-1 p-2 border border-grey-300 rounded"
                            rows="4"
                            placeholder="Enter your comments"
                            style={{ marginLeft: '3%' }}
                        ></textarea>
                        <Link to={`/Home_GeneralUser`}>
                            <button
                                className="mt-12 ml-12 mr-12 rounded-lg bg-[#016A70] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </Link>
                        <Link to={`/userreport/${collectorId}`}>
                            <button className="mt-12 ml-12 rounded-lg bg-[#419296] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">
                                Report
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Rating;