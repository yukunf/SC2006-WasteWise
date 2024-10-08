import React from "react";
import { Link } from 'react-router-dom';

const loginPage = require("../images/loginPage.png")
const wastewiseLogoVer2 = require("../images/wastewiseLogoVer2.png")

const GeneralRegistration = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <h1 className="text-4xl font-poppins font-semibold pt-150 pl-1106" style={{paddingLeft:"58%",paddingRight:"22%",paddingTop:"41px", paddingBottom:"18px"}}>
                Registration
            </h1>
            <div className="flex justify-end font-poppins text-left">
                <div className="border-2 rounded-lg shadow-xl mr-20 p-10" style={{ height: '580px', width: '650px' }}>
                    <div className="text-base font-semibold -mt-2 flex justify-between gap-4">
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
                        Password
                    </h5>
                    <input type="password" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your password"/>
                    <h5 className="text-base font-semibold mt-3">
                        Re-enter password
                    </h5>
                    <input type="password" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400" placeholder="       Enter your password again"/>
                    <div className="flex items-center mt-4">
                        <input type="checkbox" id="agree-tnc" className="h-4 w-4 border-2 border-gray-200 text-blue-600 rounded focus:ring-blue-500"/>
                        <label htmlFor="agree-tnc" className="-mt-0.5 ml-2 text-gray-700 text-sm">I’ve read and agree with Terms of Service and our Privacy Policy</label>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Link to="/" className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-16 rounded text-base font-semibold">
                            {/*insert link for home page*/}
                            Register
                        </Link>
                    </div>
                    <div className="flex justify-center mt-10">
                        <h6 className="text-sm">
                            <span>A certificated collector on our listing? </span>
                            <span className="font-bold text-[#016A70]">&gt;&gt; </span> 
                            <Link to="/collector-registration" className="font-semibold cursor-pointer text-[#016A70] hover:underline">
                                Register as collector here
                            </Link>
                        </h6>
                    </div>
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

export default GeneralRegistration;