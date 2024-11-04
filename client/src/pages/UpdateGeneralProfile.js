import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";

const wastewiseLogo = require("../images/wastewiseLogoVer1.png")
const profilePageIcon = require("../images/profilePageIcon.png")

const UpdateGeneralProfile = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [error, setError] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        new_password: '',
        confirm_password: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/users/${localStorage.getItem('user_id')}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('User details:', data);
                    setFormData({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        old_password: '', 
                        new_password: '', // Reset new_password field
                    });
                } else {
                    const errorData = await response.json();
                    setError(errorData.error);
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (formData.new_password !== formData.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        const { first_name, last_name, email, new_password, confirm_password } = formData;

        // Validate required fields
        if (!first_name || !last_name || !email || !new_password || !confirm_password) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            // Proceed to update the profile
            const response = await fetch(`http://localhost:8000/api/users/${localStorage.getItem('user_id')}/update/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    ...(new_password && { password: new_password }), // include new_password only if provided
                }),
            });

            if (response.ok) {
                setSuccessMessage(true); 
                setTimeout(() => {
                    setSuccessMessage(false);
                    navigate("/GeneralProfilePage");
                }, 3000);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                console.error('Update error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            // Proceed to update the profile
            const response = await fetch(`http://localhost:8000/api/users/${localStorage.getItem('user_id')}/delete/`, {
                method: 'delete',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setDeleteMessage(true); 
                localStorage.removeItem('token');
                localStorage.removeItem('user_id');
                localStorage.removeItem('email');
                localStorage.removeItem('collector_id');
                localStorage.removeItem('role');

                setTimeout(() => {
                    navigate("/");  // Navigate to home page after 3 seconds
                }, 3000);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                console.error('Update error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
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
            {deleteMessage && (
                <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded mb-4 text-center z-20 w-full max-w-lg">
                    Successfully deleted.
                </div>
            )}
            <div className="h-[70vh] w-full bg-white">
                
            </div>
            <div className="absolute top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-10 rounded-lg w-[950px] h-[600px] border border-gray-300 z-10  font-poppins text-left">
                <div className="flex items-center justify-end h-full">
                    <img src={profilePageIcon} className="w-[220px] mr-3" alt="Profile Icon" />
                </div>
                <div className="absolute top-10 left-20">
                    <form onSubmit={handleUpdate}>
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
                        <input
                                type="text"
                                name="first_name" 
                                value={formData.first_name} 
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"
                            />                       
                         <input  
                                type="text"
                                name="last_name" 
                                value={formData.last_name} 
                                onChange={handleChange}
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <h5 className="text-base font-semibold mt-3">
                        Email
                    </h5>
                    <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"/>
                    <h5 className="text-base font-semibold mt-3">
                        New Password
                    </h5>
                    <input  type="password" 
                            name="new_password" 
                            value={formData.new_password} 
                            onChange={handleChange}
                            className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your new password"/>
                    <h5 className="text-base font-semibold mt-3">
                        Confirm Password
                    </h5>
                    <input  type="password" 
                            name="confirm_password" 
                            value={formData.confirm_password} 
                            onChange={handleChange}
                            className="text-sm border-2 rounded-md w-[550px] p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Confirm your new password"/>
                    <h5  className="text-sm text-[#016A70] mt-5 cursor-pointer hover:underline"
                    onClick={handleDelete}>
                        Delete Your Account
                    </h5>
                    <h5 className="text-sm">
                        Please note that all boards you have created will be permanently erased.
                    </h5>
                    
                    <div className="flex justify-end gap-8 mt-7">
                        <Link to="/GeneralProfilePage" className="bg-gray-200 py-2 px-8 rounded text-base font-semibold ">Cancel</Link>
                        <button type="submit" className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-9 rounded text-base font-semibold">
                            Update Profile
                        </button>
                    </div>
                    </form>
                </div>
            </div>

            <div>
                <Footer />
            </div>

        </div>
    )
}


export default UpdateGeneralProfile;