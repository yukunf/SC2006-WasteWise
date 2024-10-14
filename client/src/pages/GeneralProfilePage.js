import React from "react";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";

const GeneralProfilePage = () => {
    return (
        <div className=" h-[35vh]  bg-[#016a70]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
            <Navbar_GeneralUser />
        {/* <div className="h-[70vh] w-full bg-white"></div> */}
        <div className="justify-center m-auto mt-[100px] bg-white shadow-lg p-10 rounded-lg w-[950px] h-[400px] border border-gray-300 font-poppins text-left">
            <div className="flex flex-col justify-between items-start w-full">
                <h1 className="text-4xl font-bold text-[#016A70]">Profile</h1>
                <div className="text-base font-semibold mt-9 flex justify-between gap-4 w-full">
                    <h5 className="w-full">
                        First Name
                    </h5>
                    <h5 className="w-full">
                        Last Name
                    </h5>
                </div>
                <div className="flex justify-between gap-4 w-full">
                    <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400">
                        First Name
                    </div>
                    <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 focus:outline-none focus:border-blue-400">
                        Last Name
                    </div>
                </div>
                <h5 className="text-base font-semibold mt-3">Email</h5>
                <div className="text-sm border-2 rounded-md w-full p-1.5 mt-1 pl-3">General user's email</div>


                <div className="flex justify-end w-full mt-7">
                    <Link to="/UpdateGeneralProfile" className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-9 rounded text-base font-semibold">
                        Update Profile
                    </Link>
                </div>

            </div>
        </div>

           
    </div>

    )
}

export default GeneralProfilePage;