import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import Navbar_PublicUser from "../components/NavBar_PublicUser"; 
import Navbar_GeneralUser from "../components/NavBar_GeneralUser"; 

const Display = () => {
    const { name } = useParams();  // Get the company name from the URL params
    const [companyInfo, setCompanyInfo] = useState(null);
    const [ratingsData, setRatingsData] = useState([]);  // Array to hold rating objects
    const [averageRating, setAverageRating] = useState(0);  // Separate state for average rating
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigateToPrev = useNavigate();
    const datasetId = "d_26afdd562f28b4acecb400c10b70f013";  // Replace with your actual dataset ID

    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Fetch the company data
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&limit=314`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCompanyInfo(data.result.records.find(c => c.company_name === decodeURIComponent(name)));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [name]);

    // Fetch ratings and comments based on collectorID (no authentication required)
    useEffect(() => {
        const fetchRatings = async () => {
            if (!companyInfo) return;  // Don't fetch if companyInfo is not set

            try {
                const response = await fetch(`http://localhost:8000/api/ratings/collector/${companyInfo._id}/`);  // No Authorization header
                if (!response.ok) {
                    throw new Error('Failed to fetch ratings');
                }
                const ratingsData = await response.json();
                setRatingsData(ratingsData);  // Set the fetched ratings

                // Calculate average rating
                const totalRating = ratingsData.reduce((sum, rating) => sum + rating.rating, 0);
                const avgRating = ratingsData.length > 0 ? totalRating / ratingsData.length : 0;
                setAverageRating(avgRating);

            } catch (error) {
                setError(error);
            }
        };

        if (companyInfo) {
            fetchRatings();
        }
    }, [companyInfo]);

    // Handle loading and error states
    if (loading) return <p className='text-center text-gray-600 italic text-lg'>Loading...</p>;
    if (error) return <p className="text-center text-red-600 font-bold text-lg">Error: {error.message}</p>;

    // Safeguard for the average rating and fallback to 0 if it's undefined or null
    const displayAverageRating = averageRating.toFixed(1);

    return (
        <div className="w-full h-full">
            {isAuthenticated ? <Navbar_GeneralUser /> : <Navbar_PublicUser />}

            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[25vh] relative" style={{ padding: "100px 10% 0" }}>
                <div className="flex-initial flex flex-col w-full lg:w-1/2 pt-4 ssm:pt-0 mt-0"></div>
            </div>

            {/* Company Name */}
            <div className="flex justify-center mt-10">
                <h2 className="text-lg font-semibold">{companyInfo ? companyInfo.company_name : 'No company found'}</h2>
            </div>
            
            {/* Company Information Table */}
            <div className="flex justify-center mt-10">
                <div className="w-[600px] bg-white shadow-md rounded-lg p-6">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr>
                                <td className="border-b py-2 font-bold">Contact Number</td>
                                <td className="border-b py-2">{companyInfo ? companyInfo.telephone_no : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="border-b py-2 font-bold">Address</td>
                                <td className="border-b py-2">{companyInfo ? companyInfo.company_address : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="border-b py-2 font-bold">Class of Licence</td>
                                <td className="border-b py-2">{companyInfo ? companyInfo.class_of_licence : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="border-b py-2 font-bold">Ratings</td>
                                <td className="border-b py-2">
                                    {/* Render stars based on the average rating */}
                                    {Array(Math.round(averageRating)).fill().map((_, index) => (
                                        <span key={index} className="text-yellow-500 text-2xl">★</span>
                                    ))}
                                    {Array(5 - Math.round(averageRating)).fill().map((_, index) => (
                                        <span key={index} className="text-gray-300 text-2xl">★</span>
                                    ))}
                                    <span className="ml-2 text-gray-600">({displayAverageRating} out of 5)</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Comments</td>
                                <td className="py-2">
                                    <div className="h-24 overflow-y-auto" style={{ maxHeight: "150px" }}>
                                        {ratingsData.length > 0 ? (
                                            ratingsData.map((rating, index) => (
                                                <div key={index} className="mb-4">
                                                    <div className="flex items-center">
                                                        {/* Render stars based on rating value */}
                                                        {Array(rating.rating).fill().map((_, i) => (
                                                            <span key={i} className="text-yellow-500 text-2xl">★</span>
                                                        ))}
                                                        {Array(5 - rating.rating).fill().map((_, i) => (
                                                            <span key={i} className="text-gray-300 text-2xl">★</span>
                                                        ))}
                                                    </div>
                                                    <strong>User {rating.userID} ({new Date(rating.created_at).toLocaleDateString()}):</strong>
                                                    <p>{rating.comments}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No comments available.</p>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-end mt-6 pr-72">
                <Link
                    onClick={() => navigateToPrev(-1)}
                    className="w-[176px] h-[52px] flex items-center justify-center bg-[#016A70] text-white rounded-lg hover:bg-[#014f52] mr-6"
                >
                    BACK
                </Link>
            </div>
        </div>
    );
};

export default Display;
