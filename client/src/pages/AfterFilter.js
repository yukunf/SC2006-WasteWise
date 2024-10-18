import React, {useState, useEffect} from "react";
import { Link, useLocation } from 'react-router-dom'; // Make sure this import is here
import NameOrFilter from "../components/NameOrFilter";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";
import Navbar_PublicUser from "../components/NavBar_PublicUser";



const AfterFilter = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const location = useLocation();
    const { searchAddress, selectedClasses } = location.state || { searchAddress: '', selectedClasses: [] }; // Handle undefined state

    // Fetch the data from API
    useEffect(() => {
        const datasetId = "d_26afdd562f28b4acecb400c10b70f013";
        const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&limit=314`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data.result.records);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Apply filters based on address and license class
    useEffect(() => {
        let filtered = data;

        // Filter by address (partial match)
        if (searchAddress) {
            filtered = filtered.filter(company =>
                company.company_address.toLowerCase().includes(searchAddress.toLowerCase())
            );
        }

        // Filter by class of license
        if (selectedClasses.length > 0) {
            filtered = filtered.filter(company => {
                const companyClasses = company.class_of_licence.split(",");
                return selectedClasses.every(cls => companyClasses.includes(cls));
            });
        }

        setFilteredData(filtered);
    }, [data, searchAddress, selectedClasses]);

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
                {filteredData.length > 0 ? (
                    filteredData.map((company, index) => (
                    <div key={index} className="border-b border-gray-300 py-2 px-12">
                        <Link to={`/display/${company._id}`}>
                            {company.company_name}
                        </Link>
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
                    to="/filter" // Adjust this link based on where "back" should go
                    className="w-[176px] h-[44px] flex items-center justify-center bg-[#016A70] text-white rounded-lg hover:bg-[#014f52] mr-6"
                    style={{ padding: "12px", marginRight: "120px" }} // Add extra margin to adjust spacing from the right
                >
                    BACK
                </Link>
            </div>

        </div>
    );
}

export default AfterFilter;