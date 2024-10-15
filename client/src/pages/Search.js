import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'; // Make sure this import is here
import Navbar_PublicUser from "../components/NavBar_PublicUser"; // Import the Navbar
import Navbar_GeneralUser from "../components/NavBar_GeneralUser"; // Import the Navbar
import NameOrFilter from "../components/NameOrFilter";
import magnifyingGlass from '../images/magnifyingGlass.png';  // Update the path to your icon image

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const datasetId = "d_26afdd562f28b4acecb400c10b70f013";
        const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&limit=314`;

        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
            })
            .then(companies => {
                setCompanies(companies.result.records);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        }, []);

        // if (loading) return <p className='text-center text-gray-600 italic text-lg'>Loading...</p>;
        if (error) return <p className="text-center text-red-600 font-bold text-lg">Error fetching data: {error.message}</p>;

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredResults = companies.filter(company =>
                company.company_name.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults([]);
        }
    };


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
                                    <Link to={`/display/${encodeURIComponent(result.company_name)}`}>{result.company_name}</Link>
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

export default Search;