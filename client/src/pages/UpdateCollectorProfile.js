import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar_Collector from "../components/NavBar_Collector";


const UpdateCollectorProfile = () => {
    const [selectedGrades, setSelectedGrades] = useState([]); // To track selected grade

    const toggleGrade = (grade) => {
        setSelectedGrades((prevSelectedGrades) => {
            if (prevSelectedGrades.includes(grade)) {
                // Remove the grade if it's already selected
                return prevSelectedGrades.filter((g) => g !== grade);
            } else {
                // Add the grade to the selection
                return [...prevSelectedGrades, grade];
            }
        });
    };

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
                navigate("/CollectorProfilePage"); // Navigate after the message shows
            }, 2000); // 10 seconds delay for the error message
        } else {
            // No error, proceed to profile update logic
            // Call API for successful update
            setSuccessMessage('Profile updated successfully!'); // Show success message
            setTimeout(() => setSuccessMessage(''), 3000); // Hide message after 3 seconds

            // Optionally navigate to profile page after a delay
            setTimeout(() => navigate("/CollectorProfilePage"), 3000);
        }
    };

    return (
        <div className="relative h-[35vh] flex flex-col lg:flex-row bg-[#016a70]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
            <Navbar_Collector />
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
            <div className="absolute mt-[450px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-10 rounded-lg w-[950px] h-[665px] border border-gray-300 font-poppins text-left">
                <div className="flex flex-col top-10 left-20">
                    <h1 className="text-4xl font-bold text-[#016A70]">
                        Profile
                    </h1>
                    <div className="text-base font-semibold mt-9 flex justify-between gap-4 w-full">
                        Collector Name
                    </div>
                    <div className="flex justify-between gap-4">
                        <input type="first name" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your name"/>
                    </div>
                    <h5 className="text-base font-semibold mt-4">
                        Address
                    </h5>
                    <input type="address" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your address"/>
                    <div className="text-base font-semibold mt-4 flex justify-between gap-4 w-full">
                        <h5 className="w-full">
                            Address Latitude
                        </h5>
                        <h5 className="w-full">
                            Address Longitude
                        </h5>
                    </div>
                    <div className="flex justify-between gap-4 w-full">
                        <input type="address latitude" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your address latitude"/>
                        <input type="address longitude" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your address longitude"/>
                    </div>
                    <h5 className="text-base font-semibold mt-4">
                        Contact Number
                    </h5>
                    <input type="contact" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your contact number"/>
                    <h5 className="text-base font-semibold mt-4">
                        License Grade
                    </h5>
                    <div className="text-sm border-2 rounded-md w-[550px] p-1.5 mt-1">
                        <div className="flex justify-between gap-4">
                        {['A', 'B', 'C'].map((grade, index) => (
                            <div key={index} onClick={() => toggleGrade(grade)} className={`w-full text-center border-2 rounded-md p-2 cursor-pointer ${
                                selectedGrades.includes(grade) ? 'bg-gray-300' : ''}`}> 
                                {grade}
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-8 mt-14">
                        <Link to='/CollectorProfilePage' className="bg-gray-200 py-2 px-8 rounded text-base font-semibold">Cancel</Link>
                        <button onClick={handleUpdate} className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-9 rounded text-base font-semibold">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* <div>
                <Footer />
            </div> */}
        </div>
    )
}

export default UpdateCollectorProfile;