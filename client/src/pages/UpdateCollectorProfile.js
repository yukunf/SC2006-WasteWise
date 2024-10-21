import React, { useEffect, useState } from "react";
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
    const [collector, setCollector] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        phone: '',
        licences: '',
    });

    useEffect(() => {
        const fetchCollectors = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/collectors/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    const filteredCollector = data.filter(col => col.id === Number(localStorage.getItem('collector_id')))
                    console.log("filteredCollector", filteredCollector)
                    setCollector(filteredCollector)
                    setFormData({
                        name: filteredCollector[0].name,
                        address: filteredCollector[0].address,
                        latitude: filteredCollector[0].lat,
                        longitude: filteredCollector[0].lng,
                        phone: filteredCollector[0].phone,
                        licences: filteredCollector[0].licences,
                    });
                    setSelectedGrades(filteredCollector[0].licences ? filteredCollector[0].licences.split(',') : []);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchCollectors();

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

        const { name, address, latitude, longitude, phone, licences } = formData;

        // Validate required fields
        if (!name || !address || !latitude || !longitude || !phone || !licences) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            // Proceed to update the profile
            const response = await fetch(`http://localhost:8000/api/collectors/${localStorage.getItem('collector_id')}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    address,
                    lat: latitude,
                    lng: longitude,
                    phone,
                    licences: selectedGrades.join(','), // send licenses as a comma-separated string
                }),
            });

            if (response.ok) {
                setSuccessMessage(true); 
                setTimeout(() => {
                    setSuccessMessage(false);
                    navigate("/CollectorProfilePage");
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
                    <form onSubmit={handleUpdate}>
                    <h1 className="text-4xl font-bold text-[#016A70]">
                        Profile
                    </h1>
                    <div className="text-base font-semibold mt-9 flex justify-between gap-4 w-full">
                        Collector Name
                    </div>
                    <div className="flex justify-between gap-4">
                        <input
                                type="text"
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"
                            />  
                    </div>
                    <h5 className="text-base font-semibold mt-4">
                        Address
                    </h5>
                        <input
                                type="text"
                                name="address" 
                                value={formData.address} 
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"
                            />
                    <div className="text-base font-semibold mt-4 flex justify-between gap-4 w-full">
                        <h5 className="w-full">
                            Address Latitude
                        </h5>
                        <h5 className="w-full">
                            Address Longitude
                        </h5>
                    </div>
                    <div className="flex justify-between gap-4 w-full">
                        <input
                                type="text"
                                name="latitude" 
                                value={formData.latitude} 
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"
                            />
                        <input
                                type="text"
                                name="longitude" 
                                value={formData.longitude}
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"
                            />
                    </div>
                    <h5 className="text-base font-semibold mt-4"> 
                        Contact Number 
                    </h5> 
                        <input
                                type="text"
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400"
                            />
                    <h5 className="text-base font-semibold mt-4">
                        License Grade
                    </h5>
                    <div className="text-sm border-2 rounded-md w-[550px] p-1.5 mt-1">
                        <div className="flex justify-between gap-4">
                        {['A', 'B', 'C'].map((grade, index) => (
                            <div key={index} onClick={() => toggleGrade(grade)} onChange={handleChange} className={`w-full text-center border-2 rounded-md p-2 cursor-pointer ${
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
                    </form>
                </div>
            </div>

            {/* <div>
                <Footer />
            </div> */}
        </div>
    )
}

export default UpdateCollectorProfile;