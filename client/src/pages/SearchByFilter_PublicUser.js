import React, {useState} from "react";
import { Link } from 'react-router-dom'; // Make sure this import is here
import NavBar_PublicUser from "../components/NavBar_PublicUser"; // Import the Navbar
import NameOrFilter from "../components/NameOrFilter";
import magnifyingGlass from '../images/magnifyingGlass.png'; // Import the magnifying glass icon
import largeImage from '../images/class.png'; // Update this path to the uploaded image


const SearchByFilters_PublicUser = () => {
    const [selectedLicense, setSelectedLicense] = useState(null);

    //handle license selecrtion
    const handleLicenseSelect = (license) => {
        setSelectedLicense(license);
    };

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


            <div className="h-auto w-full bg-white pt-10 pb-20">
                <div className="flex justify-center items-center mb-4">
                    {/* Address Bar */}
                    <div className="flex items-center border border-[#B7B7B7] rounded-lg" style={{ width: "484px", height: "52px" }}>
                        <img src={magnifyingGlass} alt="Search" className="ml-2" style={{ width: "24px", height: "24px" }} />
                        <input type="text" placeholder="e.g., Tuas/639077..." className="flex-1 h-full border-none outline-none px-2" />
                    </div>

                    {/* Class of License Bar */}
                    <div className="flex justify-between items-center border border-[#B7B7B7] rounded-lg ml-4 pr-4 pl-4" style={{ width: "484px", height: "52px" }}>
                        <button 
                            className={`flex items-center justify-center w-[133px] h-[40px] ${selectedLicense === 'A' ? 'bg-[#016A70]' : 'bg-white'} border border-[#B7B7B7] text-[#B7B7B7] rounded`} 
                            onClick={() => handleLicenseSelect('A')}
                        >
                            A
                        </button>
                        <button 
                            className={`flex items-center justify-center w-[133px] h-[40px] ${selectedLicense === 'B' ? 'bg-[#016A70]' : 'bg-white'} border border-[#B7B7B7] text-[#B7B7B7] rounded`} 
                            onClick={() => handleLicenseSelect('B')}
                        >
                            B
                        </button>
                        <button 
                            className={`flex items-center justify-center w-[133px] h-[40px] ${selectedLicense === 'C' ? 'bg-[#016A70]' : 'bg-white'} border border-[#B7B7B7] text-[#B7B7B7] rounded`} 
                            onClick={() => handleLicenseSelect('C')}
                        >
                            C
                        </button>
                    </div>

                    {/* Search Button */}
                    <Link 
                        to="/after-filter-public" 
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#016A70] text-white rounded-lg ml-4"
                    >
                        SEARCH
                    </Link>
                </div>

                {/* Large Image Below */}
                <div className="flex justify-center">
                    <img src={largeImage} alt="Description" className="mt-8" style={{ maxWidth: "60%", height: "auto" }} />
                </div>
            </div>




        </div>
    );
}
export default SearchByFilters_PublicUser;