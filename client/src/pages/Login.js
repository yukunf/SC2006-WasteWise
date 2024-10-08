import React from "react";
import { Link } from 'react-router-dom';

const loginPage = require("../images/loginPage.png")
const wastewiseLogoVer2 = require("../images/wastewiseLogoVer2.png")

const Login = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <h1 className="text-4xl font-poppins font-semibold pt-199 pl-1106" style={{paddingLeft:"58%",paddingRight:"22%",paddingTop:"100px", paddingBottom:"20px"}}>
                Log in
            </h1>
            <div className="flex justify-end font-poppins text-left">
                <div className="border-2 rounded-lg shadow-xl mr-20 p-10" style={{ height: '400px', width: '650px' }}>
                    <h5 className="text-base font-semibold -mt-4">
                        Email
                    </h5>
                    <input type="email" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-500" placeholder="       Enter your email address"/>
                    <h5 className="text-base font-semibold mt-4">
                        Password
                    </h5>
                    <input type="password" className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-500" placeholder="       Enter your password"/>
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
                        <Link to="/" className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-16 rounded text-base font-semibold">
                            {/*insert link for home page*/}
                            Log in
                        </Link>
                    </div>
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