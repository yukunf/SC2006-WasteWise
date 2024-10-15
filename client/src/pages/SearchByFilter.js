import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'; // Make sure this import is here
import NameOrFilter from "../components/NameOrFilter";
import magnifyingGlass from '../images/magnifyingGlass.png'; // Import the magnifying glass icon
import largeImage from '../images/class.png'; // Update this path to the uploaded image

import { useNavigate } from "react-router-dom";
import Navbar_PublicUser from "../components/NavBar_PublicUser";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";

const SearchByFilter = () => {
    const [searchAddress, setSearchAddress] = useState("");
    const [selectedClasses, setSelectedClasses] = useState([]);

    const navigate = useNavigate();

    // Handle address input
    const handleAddressChange = (event) => {
        setSearchAddress(event.target.value);
    };

    // Handle class selection (A, B, C)
    const handleClassSelection = (event) => {
        const value = event.target.value;
        if (selectedClasses.includes(value)) {
            setSelectedClasses(selectedClasses.filter((item) => item !== value));
        } else {
            setSelectedClasses([...selectedClasses, value]);
        }
    };

    // Handle search button click
    const handleSearch = () => {
        navigate('/afterfilter', { state: { searchAddress, selectedClasses } });
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // every logged in user will have own token
        const token = localStorage.getItem('token')

        if (token) {
            setIsAuthenticated(true)
        }

        else {
            setIsAuthenticated(false)
        }
    }, [])

    return (
        <div className="w-full h-full">
            {isAuthenticated ? <Navbar_GeneralUser /> : <Navbar_PublicUser />}

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
                        <input type="text" placeholder="e.g., Tuas/639077..." value={searchAddress} onChange={handleAddressChange} className="flex-1 h-full border-none outline-none px-2" />
                    </div>

                    {/* Class of License Bar */}
                    <div className="flex justify-between items-center border border-[#B7B7B7] rounded-lg ml-4 pr-4 pl-4" style={{ width: "484px", height: "52px" }}>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                value="A"
                                onChange={handleClassSelection}
                                checked={selectedClasses.includes("A")}
                            />
                            <span className="ml-2">Class A</span>
                        </label>

                        <label className="flex items-center ml-4">
                            <input
                                type="checkbox"
                                value="B"
                                onChange={handleClassSelection}
                                checked={selectedClasses.includes("B")}
                            />
                            <span className="ml-2">Class B</span>
                        </label>

                        <label className="flex items-center ml-4">
                            <input
                                type="checkbox"
                                value="C"
                                onChange={handleClassSelection}
                                checked={selectedClasses.includes("C")}
                            />
                            <span className="ml-2">Class C</span>
                        </label>
                    </div>

                    {/* Search Button */}
                    <button 
                        onClick={handleSearch} 
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#016A70] text-white rounded-lg ml-4"
                    >
                        SEARCH
                    </button>
                </div>

                {/* Large Image Below */}
                <div className="flex justify-center">
                    <img src={largeImage} alt="Description" className="mt-8" style={{ maxWidth: "60%", height: "auto" }} />
                </div>
            </div>




        </div>
    );
}
export default SearchByFilter;