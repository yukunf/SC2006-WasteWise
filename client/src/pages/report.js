import React from "react";
import Navbar_Regulator from "../components/NavBar_Regulator";
import {Link} from 'react-router-dom'

import Footer from "../components/Footer";

const bookIcon = require("../images/searchicon.png")

const Report = () => {
    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[50vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] ml-4 lg:ml-10">Reported Case</h1>
                <img src={bookIcon} className="lg:w-[150px] lg:h-[150px] w-[12%] mt-20 ml-4"></img>
            </div>
            <div className="flex justify-center mb-4 mt-[100px]">
                <div className="bg-white font-bold rounded-lg shadow-lg p-6 w-[90%] h-200 max-w-3x l -mt-40 relative text-left">
                    <div>
                        <p>Reported Collector: E Waste 123</p>
                        <p>Email Address: e_waste123@gmail.com</p>
                        <p>Address: 135 Bedok West 2 #01-56</p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                        <p className="mt-4">Reported by: Jess</p>
                        <p>Email Address: jess123@gmail.com</p>
                        </div>
                        <button className="rounded-lg bg-[#016A70] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium" onClick={() => alert('Contact button pressed')}>
                            Contact
                        </button>
                    </div>
                    <div>
                        
                    </div>
                    <div className="bg-[#D9D9D9] mt-[20px] rounded-2xl p-4">
                        <p>Reason stated by User:</p>
                        <p className="font-semibold mt-4">E Waste 123 took a long time before processing my request. They also
                            only informed on the spot on some of the items not being able to 
                            proceed. Bad service.</p>
                    </div>
                    <div className="bg-[#D9D9D9] mt-[20px] rounded-2xl p-4">
                        <p>Rating by User: 1/5</p>
                    </div>
                    <div className="flex justify-center mt-5 space-x-2">
                        <Link to='/listreport'>
                        <button className="bg-[#5ba6dc] text-white font-bold py-2 px-4 rounded  mt-2 shadow-xl" onClick={() => alert('Close Case')}>
                                Close Case
                            </button>
                            </Link>
                        <Link to='/remove'>
                        <button className="bg-[#FF0000] text-white font-bold py-2 px-4 rounded  mt-2 shadow-xl" >
                            Remove Collector
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Report;