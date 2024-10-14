import React from "react";
import { Link } from 'react-router-dom'; // Make sure this import is here
import NavBar_GeneralUser from "../components/NavBar_GeneralUser"; // Import the Navbar

const Display_GeneralUser = () => {
    const companyInfo = {
        name: "800 SUPER WASTE MGMT PTE LTD",
        contact: "63663800",
        address: "17A SENOKO WAY, SINGAPORE 758056",
        license: "A,B,C",
        ratings: 4, // 4 stars filled, 1 star gray
        comments: [
            { user: "John D.", date: "August 22, 2024", text: "Excellent service! The team arrived on time and handled the waste efficiently. Highly recommend!" },
            { user: "Emily R.", date: "August 18, 2024", text: "Great service overall!" },
            { user: "Jane M.", date: "August 19, 2024", text: "Responsive customer support!" },
            { user: "Mark L.", date: "August 21, 2024", text: "Professional and efficient service!" }
        ]
    };

    return (
        <div className="w-full h-full">
            {/* Navbar Component */}
            <NavBar_GeneralUser />

            {/* Content of your page */}
            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[25vh] relative" style={{ padding: "100px 10% 0" }}>
                <div className="flex-initial flex flex-col w-full lg:w-1/2 pt-4 ssm:pt-0 mt-0">
                    {/* You can add any additional content or components here if needed */}
                </div>
            </div>

            {/* Company Name - placed right above the table */}
            <div className="flex justify-center mt-10">
                <h2 className="text-lg font-semibold">{companyInfo.name}</h2>
            </div>

            {/* Company Information Table */}
            <div className="flex justify-center mt-4">
                <div className="w-[600px] bg-white rounded-lg p-6">
                    <table className="w-full text-left border-collapse" style={{ borderColor: "#B7B7B7", borderWidth: "1px", borderStyle: "solid" }}>
                        <tbody>
                            <tr>
                                <td className="border p-3 w-[30%]" style={{ borderColor: "#B7B7B7" }}>Contact Number</td>
                                <td className="border p-3 w-[70%]" style={{ borderColor: "#B7B7B7" }}>{companyInfo.contact}</td>
                            </tr>
                            <tr>
                                <td className="border p-3 w-[30%]" style={{ borderColor: "#B7B7B7" }}>Address</td>
                                <td className="border p-3 w-[70%]" style={{ borderColor: "#B7B7B7" }}>{companyInfo.address}</td>
                            </tr>
                            <tr>
                                <td className="border p-3 w-[30%]" style={{ borderColor: "#B7B7B7" }}>Class of Licence</td>
                                <td className="border p-3 w-[70%]" style={{ borderColor: "#B7B7B7" }}>{companyInfo.license}</td>
                            </tr>
                            <tr>
                                <td className="border p-3 w-[30%]" style={{ borderColor: "#B7B7B7" }}>Ratings</td>
                                <td className="border p-3 w-[70%]" style={{ borderColor: "#B7B7B7" }}>
                                    {Array(companyInfo.ratings).fill("⭐").map((star, index) => (
                                        <span key={index} style={{ color: "gold" }}>{star}</span>
                                    ))}
                                    {Array(5 - companyInfo.ratings).fill("⭐").map((star, index) => (
                                        <span key={index} style={{ color: "gray" }}>{star}</span>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td className="border p-3 w-[30%]" style={{ borderColor: "#B7B7B7" }}>Comments</td>
                                <td className="border p-3 w-[70%]" style={{ borderColor: "#B7B7B7" }}>
                                    {/* Scrollable comment box */}
                                    <div className="h-24 overflow-y-auto" style={{ maxHeight: "150px" }}>
                                        {companyInfo.comments.map((comment, index) => (
                                            <div key={index} className="mb-2">
                                                <strong>{comment.user} ({comment.date})</strong>
                                                <p>{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-end mt-6 pr-72">
                <Link
                    to="/previous-page" // Adjust this link based on where "back" should go
                    className="w-[176px] h-[52px] flex items-center justify-center bg-[#016A70] text-white rounded-lg hover:bg-[#014f52] mr-6"
                >
                    BACK
                </Link>
            </div>

        </div>
    );
}

export default Display_GeneralUser;
