import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const loginPage = require("../images/loginPage.png")
const wastewiseLogoVer2 = require("../images/wastewiseLogoVer2.png")

const CollectorRegistration = () => {
    //initialise empty array, load and check, error state
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [existingCollectorIds, setExistingCollectorIds] = useState([]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        collector_company: '',
        termsAgreed: false,
        role: 'collector', // Set default role
        collector_id:-1 
    });


    const navigate = useNavigate();

    //just company names from API (for selection of company during reg)
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
                    console.log("data", data)
                    const companyDetails = data.filter(record => record.suspended === false).map(record => ({
                        id: record.id,
                        name: record.name,
                    }));
                    console.log("data2", companyDetails)
                    setCompanies(companyDetails)
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error); 
            } finally {
                setLoading(false); // Ensure loading is set to false after fetch attempt
            }
        }

        fetchCompanies();

    }, []);


    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value // Handle checkbox separately
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Additional validation can be added here (e.g., password match check)
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!formData.termsAgreed) {
            alert("You must agree to the terms and conditions");
            return;
        }

        if (!formData.email) {
            alert("Your email cannot be empty!!");
            return;
        }

        if (!formData.first_name || !formData.last_name) {
            alert("Your first name and/or last name cannot be empty!!");
            return;
        }

        if (!formData.collector_company || !formData.collector_id) {
            alert("You must choose a collector!");
            return;
        }

        
        const selectedCompany = companies.find(company => company.name === formData.collector_company);
        console.log("s", selectedCompany, "id:", selectedCompany.id)
        const uniqueCollectorId = selectedCompany ? selectedCompany.id : -1;

        const { termsAgreed, confirmPassword, ...newFormData } = formData;
        newFormData.collector_id = uniqueCollectorId;

        try {
            const response = await fetch('http://localhost:8000/api/users/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFormData),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('User registered:', data);
                navigate('/login'); // Redirect to login on successful registration
            } else {
                const errorData = await response.json();
                if (errorData.error) {
                    alert(errorData.error); // Display error message if email already exists
                }
                else {
                    alert("Please enter all the fields!!"); // Display error message if missing fields
                }
                console.error('Registration error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // console.log("this", companies)
    //For loading and if theres error
    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <h1 className="text-4xl font-poppins font-semibold text-center justify-center" style={{paddingLeft:"49%",paddingTop:"41px", paddingBottom:"18px"}}>
                Collector Registration
            </h1>
            <div className="flex justify-end font-poppins text-left">
                <div className="border-2 rounded-lg shadow-xl mr-20 p-10" style={{ height: '580px', width: '650px' }}>
                    <form onSubmit={handleSubmit}>
                    <div className="text-base font-semibold -mt-3 flex justify-between gap-4">
                        <h5 className="w-full">
                            First Name
                        </h5>
                        <h5 className="w-full">
                            Last Name
                        </h5>
                    </div>
                    <div className="flex justify-between gap-4">
                        <input name="first_name"
                                value={formData.first_name}
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your first name"/>
                        <input name="last_name"
                                value={formData.last_name}
                                onChange={handleChange} 
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your last name"/>
                    </div>
                    <h5 className="text-base font-semibold mt-3">
                        Email
                    </h5>
                    <input type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your email address"/>
                    <h5 className="text-base font-semibold mt-3">
                        Password
                    </h5>
                    <input type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your password"/>
                    <h5 className="text-base font-semibold mt-3">
                        Re-enter password
                    </h5>
                    <input type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your password again"/>
                    <div> {/* portion for choosing company name. method will change when get the file with updates of companies!!*/}
                        <h5 className="text-base font-semibold mt-4">
                            Select the collector you belong to
                        </h5>
                        <div className="relative">
                            <select name="collector_company"
                                value={formData.collector_company}
                                onChange={handleChange}
                                className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none">
                                <option value="" disabled selected>
                                    <span className="text-gray-400">Please choose a company</span>
                                </option>
                                {/* create options of companies */}
                                {companies.map((company, index) => (
                                    <option key={index} value={company.name}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <input type="checkbox" id="agree-tnc" 
                            name="termsAgreed"
                            checked={formData.termsAgreed}
                            onChange={handleChange}
                            className="h-4 w-4 border-2 border-gray-200 text-blue-600 rounded focus:ring-blue-500"/>
                        <label htmlFor="agree-tnc" className="-mt-0.5 ml-2 text-gray-700 text-sm">I’ve read and agree with Terms of Service and our Privacy Policy</label>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button type="submit"className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-16 rounded text-base font-semibold">
                            Register
                        </button>
                    </div>
                    </form>
                    <div className="flex justify-center mt-10">
                        <h6 className="text-sm">
                            <span>Already have an account? </span> 
                            <Link to="/login" className="font-semibold cursor-pointer text-[#016A70] hover:underline">
                                Log in
                            </Link>
                        </h6>
                    </div>
                </div>
            </div>
            <div className="flex-initial flex justify-start items-center">
                <img src={loginPage} className="lg:mr-[10px]" style={{width: '480px', height: '600px', transform: 'translateY(-567px)'}}></img>
                <img src={wastewiseLogoVer2} className="absolute top-0 left-0 m-10" style={{width: '120px', height: '45px'}}></img>
            </div>
        </div>
    )
}

export default CollectorRegistration;