
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";

const wastewiseLogo = require("../images/wastewiseLogoVer1.png")
const profilePageIcon = require("../images/profilePageIcon.png")

const UpdateCollectorMainProfile = () => {
    const [error, setError] = useState(false); // To track error status
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleUpdate = () => {
        // Assume this is where you make your update API call
        const hasError = false; // Simulate an error for this example

        if (hasError) {
            setError(true); // Show error message
    
            // Delay navigation to allow the message to display
            setTimeout(() => {
                setError(false); // Hide message after 10 seconds
                navigate("/CollectorMainProfile"); // Navigate after the message shows
            }, 1000); // 10 seconds delay for the error message
        } else {
            // No error, proceed to profile update logic
            // Call API for successful update
            setSuccessMessage('Profile updated successfully!'); // Show success message
            setTimeout(() => setSuccessMessage(''), 1000); // Hide message after 3 seconds

            // Optionally navigate to profile page after a delay
            setTimeout(() => navigate("/CollectorMainProfile"), 1000);
        }
    };

    return (
        <div className="w-full h-full">
            <div className="relative h-[35vh] flex flex-col lg:flex-row bg-[#016a70]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
                <div className="absolute top-4 left-5 m-4">
                    <img src={wastewiseLogo} style={{ width: '120px', height: '45px' }} alt="Wastewise Logo" />
                </div>
            </div>
            {error && (
                <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded mb-4 text-center z-20 w-full max-w-lg">
                    Error! Please try again.
                </div>
            )}
            {successMessage && (
                <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded mb-4 text-center z-20 w-full max-w-lg">
                    Successfully updated.
                </div>
            )}
            <div className="h-[70vh] w-full bg-white">
                
            </div>
            <div className="absolute top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-10 rounded-lg w-[950px] h-[600px] border border-gray-300 z-10  font-poppins text-left">
                <div className="flex items-center justify-end h-full">
                    <img src={profilePageIcon} className="w-[220px] mr-3" alt="Profile Icon" />
                </div>
                <div className="absolute top-10 left-20">
                    <h1 className="text-4xl font-bold text-[#016A70]">
                        Account Settings
                    </h1>
                    <div className="text-base font-semibold mt-9 flex justify-between gap-4">
                        <h5 className="w-full">
                            First Name
                        </h5>
                        <h5 className="w-full">
                            Last Name
                        </h5>
                    </div>
                    <div className="flex justify-between gap-4">
                        <input type="first name" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your first name"/>
                        <input type="last name" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your last name"/>
                    </div>
                    <h5 className="text-base font-semibold mt-3">
                        Email
                    </h5>
                    <input type="email" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your email address"/>
                    <h5 className="text-base font-semibold mt-3">
                        Old Password
                    </h5>
                    <input type="password" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your old password"/>
                    <h5 className="text-base font-semibold mt-3">
                        New Password
                    </h5>
                    <input type="password" className="text-sm border-2 rounded-md w-[550px] p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your new password"/>
                    <h5  className="text-sm text-[#016A70] mt-5 cursor-pointer hover:underline">
                        Delete Your Account
                    </h5>
                    <h5 className="text-sm">
                        You will recieve an email to confirm your decision.
                    </h5>
                    <h5 className="text-sm">
                        Please note that all boards you have created will be permanently erased.
                    </h5>
                    
                    <div className="flex justify-end gap-8 mt-7">
                        <Link to="/CollectorMainProfile" className="bg-gray-200 py-2 px-8 rounded text-base font-semibold ">Cancel</Link>
                        <button onClick={handleUpdate} className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-9 rounded text-base font-semibold">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div> 
    )
}

export default UpdateCollectorMainProfile;