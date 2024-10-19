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
    const [ratingData, setRatingData] = useState(null);


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

    // console.log("dd", data)

    const { id } = useParams();
    console.log("id", id, data.length)

    useEffect(() => {
        if (id && data.length > 0) {
            const chosenCompany = data.find((c) => c._id === parseInt(id, 10));
            console.log("cc", chosenCompany)
            setCompanyInfo(chosenCompany ? chosenCompany : null); // Handle company not found
        }
    }, [id, data]); 


    const [userID, setUserID] = useState([]);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/ratings/collector/${parseInt(id, 10)}`, {
                    method: 'GET',
                    headers: {
                        // 'X-CSRFToken': getCSRFToken(),
                        'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('rating details:', data);
                    setRatingData(data)
                    const userIds = data.map(rating => rating.userID); // Assuming each rating has a `user_id` field
                    setUserID(userIds);
                    // setFullName(`${data.first_name} ${data.last_name}`);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchRating();

    }, []);

    console.log("rating", ratingData)
    console.log("User IDs:", userID);


    const [fullName, setFullName] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Function to fetch user details for each user ID
        const fetchUserDetails = async () => {
            try {
                // Make multiple requests for each user ID in the userIDs array
                const userDetailsPromises = userID.map(userID => 
                    fetch(`http://localhost:8000/api/users/${userID}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
                            'Content-Type': 'application/json',
                        },
                    }).then(response => response.json()) // Parse each response as JSON
                );
    
                // Use Promise.all to wait for all fetches to complete
                const allUserDetails = await Promise.all(userDetailsPromises);
    
                // Log the user details for debugging
                console.log('All user details:', allUserDetails);
    
                // Set the user details in state
                const fullNamesArray = allUserDetails.map(user => `${user.first_name} ${user.last_name}`);
                setFullName(fullNamesArray);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
    
        if (userID.length > 0) { // Ensure there are user IDs to fetch
            fetchUserDetails();
        }
    }, [userID]);

    console.log('full name', fullName)

    // useEffect(() => {
    //     const fetchUserDetails = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8000/api/users/${localStorage.getItem('user_id')}/`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
        
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log('User details:', data);
    //                 setFullName(`${data.first_name} ${data.last_name}`);
    //             } else {
    //                 const errorData = await response.json();
    //                 setError(errorData.error); // Display error message if retrieval fails
    //                 console.error('Retrieval error:', errorData);
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }

    //     fetchUserDetails();

    // }, []);

    useEffect(() => {
        if (ratingData && data.length > 0) {
            const combinedData = [];

            // Include rating activities
            for (let i = 0; i < ratingData.length; i++) {
                const rating = ratingData[i];
                const eachName = fullName[i];


                console.log("brooo")

                const activity = {
                    name: eachName,
                    date: (() => {
                        const date = new Date(rating.created_at);
                        const day = date.getDate(); // Get the day
                        const month = date.toLocaleString('en-US', { month: 'long' }); // Get full month name
                        const year = date.getFullYear(); // Get the year

                        return `${month} ${day}, ${year}`;
                        
                    })(),
                    // rating: rating.rating,
                    comments: rating.comments,
                    // datetime: 
                    // datetime: new Date(rating.created_at).toLocaleString(),
                    // remarks: "NIL"
                };

                combinedData.push(activity);
            }

            setComments(combinedData);
        }
    }, [ratingData, data]);

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
                                        {comments.map((c, index) => (
                                            <div key={index} className="mb-2">
                                                <strong>{c.name} ({c.date})</strong>
                                                <p>{c.comments}</p>
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



