import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Make sure this import is here
import NavBar_PublicUser from "../components/NavBar_PublicUser"; // Import the Navbar
import NameOrFilter from "../components/NameOrFilter";



const AfterFilter_PublicUser = () => {
    const companies = [
        "ANG ENG GUAN TRADING AS ENG LEE GUAN TRADING",
        "ANG HOCK GUAN TRADING AS ANG HOCK GUAN TRANSPORT SERVICE",
        "ANG KHEN TEE TRADING AS RECYCLE-PLUS DISPOSAL TRADING",
        "ANG KIAN LEE TRADING AS BOSEN TRADING & TRANSPORTATION",
        "ANG SHEE CHOON TRADING AS SIN GEE HUAT HARDWARE",
        "ANG SOON HENG TRADING AS SOON HENG TRANSPORT",
        "ANG SOON HOCK TRADING AS SOON HOCK TRANSPORT",
        "ANG SOON HUAT TRADING AS SOON HUAT TRANSPORT",
        "BAN HOCK HIN TRADING AS BAN HOCK HIN TRANSPORT"
        // Add more company names here
    ];

    const navigateToPrev = useNavigate();

    return (
        <div className="w-full h-full">
            {/* Navbar Component */}
            <NavBar_PublicUser />

            {/* Content of your page */}
            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[25vh] relative" style={{ padding: "100px 10% 0" }}>
                <div className="flex-initial flex flex-col w-full lg:w-1/2 pt-4 ssm:pt-0 mt-0">
                    {/* You can add any additional content or components here if needed */}
                </div>
            </div>
            <div className="h-auto w-full bg-white pt-20 pb-10">
                    <NameOrFilter />
            </div>

            {/* Companies List */}
            <div className="mt-4 w-full flex justify-center">
                <div
                className="w-[1009px] h-[287px] bg-white shadow-lg rounded-2xl overflow-y-auto"
                style={{
                    boxShadow: "0px 0px 33px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px",
                }}
                >
                {/* Check if there are companies to display */}
                {companies.length > 0 ? (
                    companies.map((company, index) => (
                    <div key={index} className="border-b border-gray-300 py-2 px-12">
                        {company}
                    </div>
                    ))
                ) : (
                    <div className="text-gray-500 px-12 py-4">No results found</div>
                )}
                </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-end mt-6 pr-12">
                <Link 
                    // to="/SearchByFilter_PublicUser" // Adjust this link based on where "back" should go
                    onClick={() => navigateToPrev(-1)}
                    className="w-[176px] h-[44px] flex items-center justify-center bg-[#016A70] text-white rounded-lg hover:bg-[#014f52] mr-6"
                    style={{ padding: "12px", marginRight: "120px" }} // Add extra margin to adjust spacing from the right
                >
                    BACK
                </Link>
            </div>

        </div>
    );
}

export default AfterFilter_PublicUser;