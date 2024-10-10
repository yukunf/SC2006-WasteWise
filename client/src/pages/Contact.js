import React from "react";
import Navbar_PublicUser from "../components/NavBar_PublicUser";
import Footer from "../components/Footer";
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi';

const helloGif = require("../images/wave-hello.gif")

const Contact = () => {
    return (
        <div className="bg-[#016a70] min-h-screen">
            <Navbar_PublicUser />
            
            <div className="flex flex-col lg:flex-row p-28 text-left">
                <div>
                    <h3 className="font-mono text-[#efd948b8] text-2xl mt-[100px]">How can we help you?</h3>
                    <h1 className="font-poppins font-bold text-5xl mt-[50px] text-[#FFFDF7]">Contact Us</h1>
                    <p className="font-mono mt-[50px] text-[#FFFDF7] lg:w-[60%] text-xl">We're here to help and answer any questions you might have. We look forward to hearing from you!</p>
                    <div className="flex items-center mb-2 mt-[40px] font-mono">
                        <HiLocationMarker className="text-orange-600 mr-2" />
                        <p className="text-[#FFFDF7]">123 Waste St, Singapore</p>
                    </div>
                    <div className="flex items-center mb-2 mt-[20px] font-mono">
                        <HiPhone className="text-orange-600 mr-2" />
                        <p className="text-[#FFFDF7]">+65 8765 4321</p>
                    </div>
                    <div className="flex items-center mb-2 mt-[20px] font-mono">
                        <HiMail className="text-orange-600 mr-2" />
                        <a  href="mailto:info@wastewise.com" 
                            className="text-[#FFFDF7] hover:underline">
                            info@wastewise.com
                        </a>
                    </div>
                </div>

                <div className="lg:mt-[180px] mt-[50px]">
                    <img src={helloGif} alt="Friends Waving" className="w-[600px] rounded-2xl" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;