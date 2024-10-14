import React, {useState} from "react";
import { Link } from 'react-router-dom'; // Make sure this import is here
import NavBar_GeneralUser from "../components/NavBar_GeneralUser"; // Import the Navbar
import NameOrFilter from "../components/NameOrFilter_GeneralUser";
import magnifyingGlass from '../images/magnifyingGlass.png';  // Update the path to your icon image

const Search_GeneralUser = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const companies = [
        "ANG ENG GUAN TRADING AS ENG LEE GUAN TRADING",
        "ANG HOCK GUAN TRADING AS ANG HOCK GUAN TRANSPORT SERVICE",
        "ANG KHEN TEE TRADING AS RECYCLE-PLUS DISPOSAL TRADING",
        "ANG KIAN LEE TRADING AS BOSEN TRADING & TRANSPORTATION",
        "ANG SHEE CHOON TRADING AS SIN GEE HUAT HARDWARE",
        "ANG SOON HUAT TRADING AS ANG SOON HUAT TRANSPORT SERVICE",
        "ANG TEE SENG TRADING AS ANG TEE SENG TRANSPORT SERVICE",
        "BENNY TAN TRADING AS BENNY TAN TRANSPORT SERVICE",
        "BOON HENG TRADING AS BOON HENG TRANSPORT SERVICE",
        "BOON HOCK TRADING AS BOON HOCK TRANSPORT SERVICE",
        "BOON HUAT TRADING AS BOON HUAT TRANSPORT SERVICE",
        "BOON KEE TRADING AS BOON KEE TRANSPORT SERVICE"
        // Add more company names here
    ];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredResults = companies.filter(company =>
                company.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults([]);
        }
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

            <div className="h-auto w-full bg-white pt-20 pb-10">
                    <NameOrFilter />
            </div>

            {/* Search Input */}
            <div className="mt-6 flex justify-center">
                <div 
                    className="flex items-center justify-center" 
                    style={{
                        width: '1009px', 
                        height: '52px', 
                        border: '2px solid #B7B7B7', 
                        borderRadius: '8px', 
                        flexShrink: 0,
                        padding: '0 10px'
                    }}
                >
                    {/* Magnifying glass icon */}
                    <img 
                        src={magnifyingGlass}  // Update the path to your icon image
                        alt="Search"
                        className="mr-3"
                        style={{ width: '30px', height: '30px' }}
                    />

                    {/* Search Input */}
                    <input 
                        type="text" 
                        className="w-full h-full outline-none"
                        style={{
                            border: 'none',  // Remove the border from the input
                            height: '100%', 
                            fontSize: '20px',
                        }} 
                        placeholder="Enter the name of the waste collector..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Search Results */}
            {searchTerm && (
                <div className="mt-4 w-full flex justify-center">
                    <div 
                        className="w-[1009px] h-[287px] bg-white shadow-lg rounded-2xl overflow-y-auto"  // Apply the required styles
                        style={{
                            boxShadow: '0px 0px 33px 0px rgba(0, 0, 0, 0.25)',
                            borderRadius: '20px',
                        }}
                    >
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <div key={index} className="border-b border-gray-300 py-2 px-12">
                                    {result}
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 px-12">No results found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search_GeneralUser;