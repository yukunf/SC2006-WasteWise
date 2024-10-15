import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import Navbar_PublicUser from "../components/NavBar_PublicUser"; 
import Navbar_GeneralUser from "../components/NavBar_GeneralUser"; 


const Display = () => {
    const dummyData = {
        ratings: 4,
        comments: [
            { user: "John D.", date: "August 22, 2024", text: "Excellent service! The team arrived on time and handled the waste efficiently. Highly recommend!" },
            { user: "Emily R.", date: "August 18, 2024", text: "Great service overall!" },
            { user: "Jane M.", date: "August 19, 2024", text: "Responsive customer support!" },
            { user: "Mark L.", date: "August 21, 2024", text: "Professional and efficient service!" }
        ],
    };

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { name } = useParams();  // Get the company name from the URL params
    const [companyInfo, setCompanyInfo] = useState(null);

    const navigateToPrev = useNavigate();

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


    // First useEffect for fetching data
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
            .then(data => {
                setData(data.result.records);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []); // Runs once when the component mounts

    
    useEffect(() => {
        if (name && data.length > 0) {
            const chosenCompany = data.find((c) => c.company_name === decodeURIComponent(name));
            setCompanyInfo(chosenCompany ? chosenCompany : null); // Handle company not found
        }
    }, [name, data]); 

    // Handle loading and error states
    if (loading) return <p className='text-center text-gray-600 italic text-lg'>Loading...</p>;
    if (error) return <p className="text-center text-red-600 font-bold text-lg">Error fetching data: {error.message}</p>;

    // console.log("chosen company", companyInfo);
    
    return (
        <div className="w-full h-full">
            {isAuthenticated ? <Navbar_GeneralUser /> : <Navbar_PublicUser />}

            {/* Content of your page */}
            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[25vh] relative" style={{ padding: "100px 10% 0" }}>
                <div className="flex-initial flex flex-col w-full lg:w-1/2 pt-4 ssm:pt-0 mt-0">
                    {/* You can add any additional content or components here if needed */}
                </div>
            </div>

            {/* Company Name - placed right above the table */}
            <div className="flex justify-center mt-10">
                <h2 className="text-lg font-semibold">{companyInfo ? companyInfo.company_name : 'No company found'}</h2>
            </div>
            
            {/* Company Information Table */}
            <div className="flex justify-center mt-10">
                <div className="w-[600px] bg-white shadow-md rounded-lg p-6">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            <tr>
                                <td className="border-b py-2 font-bold">Contact Number</td>
                                <td className="border-b py-2">{companyInfo ? companyInfo.telephone_no : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="border-b py-2 font-bold">Address</td>
                                <td className="border-b py-2">{companyInfo ? companyInfo.company_address : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="border-b py-2 font-bold">Class of Licence</td>
                                <td className="border-b py-2">{companyInfo ? companyInfo.class_of_licence : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className="border-b py-2 font-bold">Ratings</td>
                                <td className="border-b py-2">
                                    {Array(dummyData.ratings).fill().map((_, index) => (
                                        <span key={index} className="text-yellow-500 text-2xl">★</span>
                                    ))}
                                    {Array(5 - dummyData.ratings).fill().map((_, index) => (
                                        <span key={index} className="text-gray-300 text-2xl">★</span>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 font-bold">Comments</td>
                                <td className="py-2">
                                    {/* Scrollable comment box */}
                                    <div className="h-24 overflow-y-auto" style={{ maxHeight: "150px" }}>
                                        {dummyData.comments.map((comment, index) => (
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
                    // to="/previous-page" // Adjust this link based on where "back" should go
                    onClick={() => navigateToPrev(-1)}
                    className="w-[176px] h-[52px] flex items-center justify-center bg-[#016A70] text-white rounded-lg hover:bg-[#014f52] mr-6"
                >
                    BACK
                </Link>
            </div>



        </div>
    );
}

export default Display;



