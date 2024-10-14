import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const loginPage = require("../images/loginPage.png")
const wastewiseLogoVer2 = require("../images/wastewiseLogoVer2.png")

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Update state based on input name
        });
    };

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the page from refreshing

        try {
            const response = await fetch("http://localhost:8000/api/users/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful, response data: ", data);

                // Store token and user details
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('email', data.email);
                localStorage.setItem('collector_id', data.collector_id);
                localStorage.setItem('role', data.role);

                // Redirect to respective home page after successful login
                if (localStorage.getItem('role') == 'general') {
                    navigate("/Home_GeneralUser");
                }
                else if (localStorage.getItem('role') == 'collector') {
                    navigate("/Home_Collector");
                }
                else if (localStorage.getItem('role') == 'regulator') {
                    navigate("/Home_Regulator");
                }
                else {
                    navigate("/");
                }
                    
            } else {
                setErrorMessage("Invalid email or password."); // Set error message for invalid login
            }
        } catch (error) {
            setErrorMessage("Login failed. Please try again."); // Set error message for failed login
        }
    };
    
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <h1 className="text-4xl font-poppins font-semibold pt-199 pl-1106" style={{paddingLeft:"58%",paddingRight:"22%",paddingTop:"100px", paddingBottom:"20px"}}>
                Log in
            </h1>
            <div className="flex justify-end font-poppins text-left">
                <div className="border-2 rounded-lg shadow-xl mr-20 p-10" style={{ height: '400px', width: '650px' }}>
                    <form onSubmit={handleLogin}>
                    <h5 className="text-base font-semibold -mt-4">
                        Email
                    </h5>
                    <input  type="email"
                            name="email" // Set name for handling state
                            value={formData.email}
                            onChange={handleChange} 
                            className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-500" placeholder="       Enter your email address"/>
                    <h5 className="text-base font-semibold mt-4">
                        Password
                    </h5>
                    <input type="password"
                            name="password" // Set name for handling state
                            value={formData.password}
                            onChange={handleChange}
                            className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-500" placeholder="       Enter your password"/>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember-me" className="h-4 w-4 border-2 border-gray-200 text-blue-600 rounded focus:ring-blue-500"/>
                            <label htmlFor="remember-me" className="-mt-0.5 ml-2 text-gray-700 text-sm">Remember me</label>
                        </div>
                        <div className="-mt-0.5 text-sm text-blue-600 cursor-pointer hover:underline">
                            Forgot password?
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button type="submit" className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-16 rounded text-base font-semibold">
                            Log in
                        </button>
                    </div>
                    {errorMessage && <div className="text-red-500 mt-2 text-center">{errorMessage}</div>} {/* Display error message */}
                    </form>
                    <div className="flex justify-center mt-20">
                        <h6 className="text-sm">
                            <span>New user? </span> 
                            <Link to="/general-registration" className="font-semibold cursor-pointer text-[#016A70] hover:underline">Registration</Link>
                        </h6>
                    </div>
                </div>
            </div>
            <div className="flex-initial flex justify-start items-center">
                <img src={loginPage} className="lg:mr-[10px]" style={{width: '480px', height: '600px', transform: 'translateY(-447px)'}}></img>
                <img src={wastewiseLogoVer2} className="absolute top-0 left-0 m-10" style={{width: '120px', height: '45px'}}></img>
            </div>
        </div>
    )
}

export default Login;