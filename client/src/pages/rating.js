import React, { useState, useEffect} from "react";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";
import {Link, useNavigate} from 'react-router-dom';

// const Rating = () => {
//     const [companies, setCompanies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [collectorName, setCollectorName] = useState(1);

//     const [formData, setFormData] = useState({
//         collector_company: '',
//         collectorID: '',
//         rating: 0,
//         comment: '',
//         user: localStorage.getItem('user_id'),
//         created_at: '',
//     });


//     const navigate = useNavigate();

//     //just company names from API (for selection of company during reg)
//     useEffect(() => {
//         const fetchCompanies = async () => {
//             try {
//                 const response = await fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_26afdd562f28b4acecb400c10b70f013&limit=314');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const json = await response.json();
//                 // const companyNames = json.result.records.map(record => record.company_name); // Adjust the key based on the actual data structure
//                 const companyDetails = json.result.records.map(record => ({
//                     id: record._id, // Assuming the ID is included
//                     name: record.company_name,
//                 }));
//                 setCompanies(companyDetails);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCompanies();
//     }, []);

//     const handleChange = (e) => {
//         const { name, type, value, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value // Handle checkbox separately
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         // Additional validation can be added here (e.g., password match check)


//         if (!formData.comment) {
//             alert("You must fill up the form!");
//             return;
//         }

//         console.log(formData.collectorID)

//         const selectedCompany = companies.find(company => company.name === formData.collector_company);
//         console.log("s", selectedCompany, "id:", selectedCompany.id)
//         const uniqueCollectorId = selectedCompany ? selectedCompany.id : -1;

//         const newFormData = {
//             ...formData,
//             collectorID: uniqueCollectorId,
//             created_at: new Date().toISOString(),
//         };

//         try {
//             const response = await fetch('http://localhost:8000/api/ratings/', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newFormData),
//             });
    
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('User registered:', data);
//                 navigate('/login'); // Redirect to login on successful registration
//             } else {
//                 const errorData = await response.json();
//                 alert(errorData.error); // Display error message if email already exists
//                 console.error('Registration error:', errorData);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     // console.log("this", companies)
//     //For loading and if theres error
//     // if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div className="w-full h-full">
//             <Navbar_GeneralUser/>
//             <div className="flex flex-col bg-[#016a70] h-[20vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}></div>
//             <div className="mt-20 pl-20">
//             <form onSubmit={handleSubmit}>

//                 <p className="text-lg text-bold text-left pl-20">Collector Name</p>
//                 <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1">
//                 <div className="relative">
//                             <select className="text-sm  w-full p-1.5 mt-1 focus:outline-none"
//                                 name="collector_company"
//                                 value={formData.collector_company}
//                                 onChange={handleChange}
//                             >
//                                 <option value="" disabled>
//                                     <span className="text-gray-400">Please choose a company</span>
//                                 </option>
//                                 {/* create options of companies */}
//                                 {companies.map((company, index) => (
//                                    <option key={index} value={company.name}>
//                                         {company.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                 </div>
//                 <p className="text-lg text-bold text-left pl-20 mt-12">Give your ratings</p>
//                 <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1 flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                         <span 
//                             key={star}
//                             onClick={() => handleChange({
//                                 target: {
//                                     name: 'rating', // The name to match the formData property
//                                     value: star.toString(), // Convert the star number to string for consistency
//                                 }
//                             })}
//                             className={`cursor-pointer text-2xl ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'}`}
//                             style={{ marginRight: '25px' }}
//                         >★
//                         </span>
//                     ))}
//                 </div>
//                 <div className="mt-12">
//                     <p className="text-lg text-bold text-left pl-20 mt-12">Comments</p>
//                     <div className="flex items-center">
//                         <textarea 
//                                 name="comment"
//                                 value={formData.comment}
//                                 onChange={handleChange}
//                         className="mr-12 w-[42%] mt-1 p-2 border border-grey-300 rounded" rows="4" placeholder="Enter your comments" style={{ marginLeft: '3%' }}></textarea>
//                         <button type='submit' className="mt-12 ml-12 mr-12 rounded-lg bg-[#016A70] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">Submit</button>
//                         <Link to={`/userreport/${collectorName}`}><button className="mt-12 ml-12 rounded-lg bg-[#419296] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">Report</button></Link>
//                     </div>
//                 </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


const Rating = () => {
    const [rating, setRating] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collectorId, setCollectorId] = useState(""); // Store the collector ID

    const getCSRFToken = () => {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];
    };
    
    const handleStarClick = (index) => {
        setRating(index);
    };

    const handleSelectChange = (event) => {
        setCollectorId(event.target.value);
    };

    // Fetch company names and IDs from API
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_26afdd562f28b4acecb400c10b70f013&limit=314');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                const companyData = json.result.records.map(record => ({
                    id: record._id,  // Replace with the actual ID key from your API
                    name: record.company_name
                }));
                setCompanies(companyData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);
    const handleSubmit = async () => {
        const comments = document.querySelector('textarea').value;
    
        if (!rating || !comments || !collectorId) {
            alert("Please provide a rating, comments, and select a collector.");
            return;
        }
    
        const ratingData = {
            collectorID: collectorId,
            rating: rating,
            comment: comments,
        };
    
        try {
            const response = await fetch('http://localhost:8000/api/ratings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(),
                },
                credentials: 'include',  // This ensures cookies (session) are included in the request
                body: JSON.stringify(ratingData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Status:', response.status);
                console.error('Error Details:', errorData);
                alert('An error occurred: ' + (errorData.detail || errorData.message));
            } else {
                alert('Rating submitted successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the rating.');
        }
    };
    
    
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full h-full">
            <Navbar_GeneralUser />
            <div className="flex flex-col bg-[#016a70] h-[20vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}></div>
            <div className="mt-20 pl-20">
                <p className="text-lg text-bold text-left pl-20">Collector Name</p>
                <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1">
                    <div className="relative">
                        <select
                            className="text-sm w-full p-1.5 mt-1 focus:outline-none"
                            value={collectorId}
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled>
                                <span className="text-gray-400">Please choose a company</span>
                            </option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <p className="text-lg text-bold text-left pl-20 mt-12">Give your ratings</p>
                <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleStarClick(star)}
                            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            style={{ marginRight: '25px' }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div className="mt-12">
                    <p className="text-lg text-bold text-left pl-20 mt-12">Comments</p>
                    <div className="flex items-center">
                        <textarea
                            className="mr-12 w-[42%] mt-1 p-2 border border-grey-300 rounded"
                            rows="4"
                            placeholder="Enter your comments"
                            style={{ marginLeft: '3%' }}
                        ></textarea>
                        <button
                            className="mt-12 ml-12 mr-12 rounded-lg bg-[#016A70] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <Link to={`/userreport/${collectorId}`}>
                            <button className="mt-12 ml-12 rounded-lg bg-[#419296] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">
                                Report
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Rating;