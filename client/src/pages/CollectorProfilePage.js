import React from "react";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar_Collector from "../components/NavBar_Collector";

const CollectorProfilePage = () => {
    return (
        <div className="relative h-[35vh] flex flex-col lg:flex-row bg-[#016a70]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
            <Navbar_Collector />
        <div className="absolute mt-[400px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-10 rounded-lg w-[950px] h-[600px] border border-gray-300 font-poppins text-left">
            <div className="flex justify-between items-start">
                <div className="w-[220px] h-[220px] flex items-center justify-center border border-gray-500 ml-auto">
                    Company logo
                </div>
                <div className="absolute top-10 left-20">
                    <h1 className="text-4xl font-bold text-[#016A70]">Profile</h1>
                    <div className="text-base font-semibold mt-9 flex justify-between gap-4 w-full">Collector Name</div>
                    <div className="flex justify-between gap-4 text-sm border-2 rounded-md w-full p-1.5 mt-1 pl-3">Collector name</div>
                    <h5 className="text-base font-semibold mt-3">Address</h5>
                    <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 pl-3">Collector location</div>
                    <h5 className="text-base font-semibold mt-3">Contact Number</h5>
                    <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 pl-3">Collector contact number</div>
                    <h5 className="text-base font-semibold mt-3">Opening Hours</h5>
                    <div className="text-sm border-2 rounded-md w-[550px] p-1.5 mt-1 pl-3">Collector opening hours</div>
                    <h5 className="text-base font-semibold mt-3">License Grade</h5>
                    <div className="text-sm border-2 rounded-md w-[550px] p-1.5 mt-1">
                        <div className="flex justify-between gap-4">
                            <div className="w-full text-center border-2 rounded-md p-2">A</div>
                            <div className="w-full text-center border-2 rounded-md p-2">B</div>
                            <div className="w-full text-center border-2 rounded-md p-2">C</div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-8 mt-7">
                        <Link to="/UpdateCollectorProfile" className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-9 rounded text-base font-semibold">Update Profile</Link>
                    </div>
                </div>
            </div>
        </div>

            <div>
                <Footer />
            </div>
    </div>

    )
}

export default CollectorProfilePage;