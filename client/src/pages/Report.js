import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar_Regulator from "../components/NavBar_Regulator";
import Footer from "../components/Footer";

const bookIcon = require("../images/searchicon.png");

const Report = () => {
    const { id } = useParams();  // Extract report ID from URL
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [contacted, setContacted] = useState(false);  // New state for contact button

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/reports/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Send user token if needed
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setReport(data);  // Set the report data to state
                } else {
                    setErrorMessage('Failed to fetch report details.');
                }
            } catch (error) {
                setErrorMessage('Network error. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleContact = () => {
        setContacted(true);  // Set contacted to true when the button is pressed
        alert('Collector has been contacted');
    };

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[50vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] ml-4 lg:ml-10">Reported Case</h1>
                <img src={bookIcon} className="lg:w-[150px] lg:h-[150px] w-[12%] mt-20 ml-4" alt="Book Icon" />
            </div>
            <div className="flex justify-center mb-4 mt-[100px]">
                <div className="bg-white font-bold rounded-lg shadow-lg p-6 w-[90%] h-200 max-w-3xl -mt-40 relative text-left">
                    <div>
                        <p>Reported Collector: {report?.collector_name || 'N/A'}</p>
                        <p>Email Address: {report?.collector_email || 'N/A'}</p>
                        <p>Address: {report?.collector_address || 'N/A'}</p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="mt-4">Reported by: {report?.user_name || 'N/A'}</p>
                            <p>Email Address: {report?.user_email || 'N/A'}</p>
                        </div>
                        <button 
                            className={`rounded-lg w-[251px] h-[52px] shadow-xl text-white p-3 font-medium ${contacted ? 'bg-gray-500' : 'bg-[#016A70]'}`} 
                            onClick={handleContact}
                            disabled={contacted}  // Disable the button once clicked
                        >
                            {contacted ? 'Contacted' : 'Contact'}  {/* Toggle button text */}
                        </button>
                    </div>
                    <div className="bg-[#D9D9D9] mt-[20px] rounded-2xl p-4">
                        <p>Reason stated by User:</p>
                        <p className="font-semibold mt-4">{report?.reason || 'N/A'}</p>
                    </div>
                    <div className="bg-[#D9D9D9] mt-[20px] rounded-2xl p-4">
                        <p>Comments: {report?.comments || 'N/A'}</p>
                    </div>
                    <div className="flex justify-center mt-5 space-x-2">
                        <Link to='/listreport'>
                            <button className="bg-[#5ba6dc] text-white font-bold py-2 px-4 rounded mt-2 shadow-xl" onClick={() => alert('Close Case')}>
                                Close Case
                            </button>
                        </Link>
                        <Link to={`/remove/${id}`}>
                            <button className="bg-[#FF0000] text-white font-bold py-2 px-4 rounded mt-2 shadow-xl">
                                Remove Collector
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Report;
