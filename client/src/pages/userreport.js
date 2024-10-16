import React, { useState } from "react";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";
import { Link, useParams } from 'react-router-dom';

const UserReport = () => {
    const [rating, setRating] = useState("");  // The reason for reporting
    const [comments, setComments] = useState("");  // The comments field
    const { collectorName } = useParams();

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    // Function to get the CSRF token from cookies
    const getCSRFToken = () => {
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken'))
            ?.split('=')[1];
        return csrfToken;
    };

    const handleSubmit = async () => {
        if (!rating || !comments) {
            alert("Please provide a reason and comments for the report.");
            return;
        }
    
        const reportData = {
            collector: collectorName,
            reason: rating,
            comments: comments,
        };
    
        try {
            const response = await fetch('http://localhost:8000/api/reports/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(),  // Include CSRF token here
                },
                credentials: 'include',  // Include credentials (cookies) with the request
                body: JSON.stringify(reportData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();  // Log the error response
                console.error('Error Status:', response.status);
                console.error('Error Details:', errorData);
                alert('An error occurred while submitting the report: ' + (errorData.detail || errorData.message));
            } else {
                alert('Report submitted successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the report.');
        }
    };

    return (
        <div className="w-full h-full">
            <Navbar_GeneralUser collectorName={collectorName} />
            <div className="flex flex-col bg-[#016a70] h-[20vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}></div>
            <div className="mt-20 pl-20">
                <p className="text-lg text-bold text-left pl-20">Collector Name</p>
                <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1">
                    <p>{collectorName}</p>
                </div>
                <p className="text-lg text-bold text-left pl-20 mt-12">Reason</p>
                <select
                    className="w-[42%] p-2 border border-grey-300 rounded mb-4 mt-2"
                    style={{ marginLeft: '-52%' }}
                    value={rating}
                    onChange={handleRatingChange}
                >
                    <option value="" disabled>Select reason</option>
                    <option value="Poor service">Poor service</option>
                    <option value="Bad communication">Bad communication</option>
                    <option value="Slow response">Slow response</option>
                    <option value="Lack professionalism">Lack professionalism</option>
                </select>
                <div className="mt-12">
                    <p className="text-lg text-bold text-left pl-20 mt-12">Comments</p>
                    <div className="flex items-center">
                        <textarea
                            className="mr-12 w-[42%] mt-1 p-2 border border-grey-300 rounded"
                            rows="4"
                            placeholder="Enter your comments"
                            style={{ marginLeft: '3%' }}
                            value={comments}
                            onChange={handleCommentsChange}
                        ></textarea>
                        <button
                            className="mt-12 ml-12 mr-12 rounded-lg bg-[#016A70] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <Link to='/rating'>
                            <button className="mt-12 ml-12 rounded-lg bg-[#747474] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">
                                BACK
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReport;
