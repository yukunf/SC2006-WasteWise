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
    const [contacted, setContacted] = useState(false);  // State for contacted button
    const [suspended, setSuspended] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Fetch the report details, including the contacted status
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/reports/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setReport(data);
                    setContacted(data.contacted);  // Set contacted state from backend data
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

    console.log("hi", report)

    const markAsCompleted = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/reports/${id}/complete/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                setCompleted(true);  // Update local state to reflect the change
                alert('All reports for this collector have been marked as completed.');
            } else {
                alert('Failed to mark as completed');
            }
        } catch (error) {
            alert('Network error. Please try again later.');
        }
    };
    
    const markAsContacted = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/reports/${id}/contact/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                setContacted(true);  // Update local state to reflect the change
                alert('All reports for this collector have been marked as contacted.');
            } else {
                alert('Failed to mark as contacted');
            }
        } catch (error) {
            alert('Network error. Please try again later.');
        }
    };
    

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
                    const sp = data.find(record => record.id === report?.collector_id)?.suspended
                    console.log(sp, 'bae what')
                    setSuspended(sp)
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(error); 
            } finally {
                setLoading(false); // Ensure loading is set to false after fetch attempt
            }
        }

        fetchCompanies();

    }, [report]);

    // Handle the contact button click
    const handleContact = () => {
        if (!contacted) {
            markAsContacted();  // Send request to mark the report as contacted
        }
    };

    // If the report is still loading, show a loading message
    if (loading) return <p>Loading...</p>;
    // If there's an error, display it
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
                        <p>Telephone: {report?.collector_telephone || 'N/A'}</p>
                        <p>Address: {report?.collector_address || 'N/A'}</p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <p className="mt-4">Reported by: {report?.user_name || 'N/A'}</p>
                            <p>Email Address: {report?.user_email || 'N/A'}</p>
                        </div>
                        <button 
                            className={`rounded-lg w-[251px] h-[52px] shadow-xl text-white p-3 font-medium ${suspended ? 'bg-[#BE2D08]' : contacted ? 'bg-gray-500' : 'bg-[#016A70]'}`} 
                            onClick={handleContact}
                            disabled={contacted}  // Disable the button if already contacted
                        >
                            {suspended ? 'Suspended' : contacted ? 'Contacted' : 'Contact'}  {/* Toggle button text */}
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
                            <button className="bg-[#5ba6dc] text-white font-bold py-2 px-4 rounded mt-2 shadow-xl" >
                                Return to List
                            </button>
                        </Link>
                        <Link to='/listreport'>
                            <button className="bg-[green] text-white font-bold py-2 px-4 rounded mt-2 shadow-xl" onClick={markAsCompleted} >
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
