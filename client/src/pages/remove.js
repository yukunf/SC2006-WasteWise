import React from "react";
import {Link} from 'react-router-dom'
import Footer from "../components/Footer";
import Navbar_Regulator from "../components/NavBar_Regulator";

const Remove = () => {
    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col bg-[#016a70] h-[50vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] text-center">Remove Collector</h1>
                <div className="flex justify-center items-start flex-grow mt-6">
                    <div className="bg-white font-bold rounded-lg shadow-lg p-6 w-[90%] h-200 max-w-3xl z-10 relative flex flex-col justify-center">
                        <p>Reported Collector: E Waste 123</p>
                        <p>Email Address: e_waste123@gmail.com</p>
                        <p>Address: 135 Bedok West 2 #01-56</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-center items-start flex-grow mt-6">
                    <div className="bg-white font-bold rounded-lg shadow-lg p-6 w-[90%] h-200 max-w-3xl z-10 relative flex flex-col justify-center">
                        <p>Reason for Removal:</p>
                        <textarea className="mt-4 w-full p-2 border border-grey-300 rounded" rows="4" placeholder="Enter reason here..."></textarea>
                        <div className="flex justify-center mt-4">
                            <Link to='/listreport'><button className="rounded-lg bg-[#5574ff] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">
                                Submit
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Remove;