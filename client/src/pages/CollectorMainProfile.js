import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar_Collector from "../components/NavBar_Collector";

const CollectorMainProfile = () => {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/users/${localStorage.getItem('user_id')}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('User details:', data);
                    setFirstName(`${data.first_name}`);
                    setLastName(`${data.last_name}`);
                    setEmail(`${data.email}`);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchUserDetails();

    }, []);

    return (
        <div className=" h-[35vh]  bg-[#016a70]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
            <Navbar_Collector />
        {/* <div className="h-[70vh] w-full bg-white"></div> */}
        <div className="justify-center m-auto mt-[100px] bg-white shadow-lg p-10 rounded-lg w-[950px] h-[400px] border border-gray-300 font-poppins text-left">
            <div className="flex flex-col justify-between items-start w-full">
                <h1 className="text-4xl font-bold text-[#016A70]">Profile</h1>
                <div className="text-base font-semibold mt-9 flex justify-between gap-4 w-full">
                    <h5 className="w-full">
                        First Name
                    </h5>
                    <h5 className="w-full">
                        Last Name
                    </h5>
                </div>
                <div className="flex justify-between gap-4 w-full">
                    <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400">
                        {firstName}
                    </div>
                    <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400">
                        {lastName}
                    </div>
                </div>
                <h5 className="text-base font-semibold mt-3">Email</h5>
                <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 pl-3">{email}</div>


                <div className="flex justify-end w-full mt-7">
                    <Link to="/UpdateCollectorMainProfile" className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-9 rounded text-base font-semibold">
                        Update Profile
                    </Link>
                </div>

            </div>
        </div>

           
    </div>

    )
}

export default CollectorMainProfile;