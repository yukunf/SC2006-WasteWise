import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar_Regulator from "../components/NavBar_Regulator";

const Remove = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [removalReason, setRemovalReason] = useState('');  // Capture the reason for removal
    const navigate = useNavigate();

    const handleRemove = async () => {
        setErrorMessage('');  // Clear previous errors
        setLoading(true);  // Start loader

        try {
            const response = await fetch('/api/collectors/remove/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Send user token if needed
                },
                body: JSON.stringify({
                    collector_name: 'E Waste 123',  // Replace with dynamic collector if needed
                    reason: removalReason  // Send reason for removal
                })
            });

            if (response.ok) {
                alert('Collector removed successfully');
                navigate('/listreport');  // Redirect to the list of reports
            } else {
                setErrorMessage('Failed to remove the collector.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col bg-[#016a70] h-[50vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] text-center">Remove Collector</h1>
                <div className="flex justify-center items-start flex-grow mt-6">
                    <div className="bg-white font-bold rounded-lg shadow-lg p-6 w-[90%] h-200 max-w-3xl z-10 relative flex flex-col justify-center">
                        <p>Reported Collector: E Waste 123</p>
                        <p>Email Address: e_waste123@gmail.com</p>
                        <p>Address: 135 Bedok West 2 #01-56</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-center items-start flex-grow mt-6">
                    <div className="bg-white font-bold rounded-lg shadow-lg p-6 w-[90%] h-200 max-w-3xl z-10 relative flex flex-col justify-center">
                        <p>Reason for Removal:</p>
                        <textarea
                            className="mt-4 w-full p-2 border border-grey-300 rounded"
                            rows="4"
                            placeholder="Enter reason here..."
                            value={removalReason}
                            onChange={(e) => setRemovalReason(e.target.value)}  // Capture the reason for removal
                        ></textarea>
                        <div className="flex justify-center mt-4">
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}  {/* Show error message if any */}
                            <button
                                className="rounded-lg bg-[#5574ff] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium"
                                onClick={handleRemove}
                                disabled={loading}
                            >
                                {loading ? 'Removing...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Remove;
