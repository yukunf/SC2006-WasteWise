import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";

const Activities = () => {
    const [ratingData, setRatingData] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [data, setData] = useState([]); // Use state to hold combined data

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/reports/list`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('report details:', data);
                    const filteredReports = data.filter(report => report.userID === Number(localStorage.getItem('user_id')))
                    setReportData(filteredReports)
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchReport();

    }, []);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/ratings/${localStorage.getItem('user_id')}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('rating details:', data);
                    setRatingData(data)
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

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/collectors`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('Collector details:', data);
                    const companyDetails = data.map(record => ({
                        id: record.id,
                        name: record.name,
                    }));
                    setCompanies(companyDetails)
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchCompanies();

    }, []);

    console.log("rating", ratingData)
    console.log("report", reportData)
    console.log("company", companies)

    // Combine rating data and reporting activities
    useEffect(() => {
        if (ratingData && companies.length > 0) {
            const combinedData = [];

            // rating activities
            for (let i = 0; i < ratingData.length; i++) {
                const rating = ratingData[i];

                const selectedCompany = companies.find(company => company.id === rating.collectorID);
                const companyName = selectedCompany ? selectedCompany.name : "Unknown Company";

                const activity = {
                    serial_no: i+1,
                    activity_type: "Rating Collector",
                    content: `Rated ${companyName} (Collector ID: ${rating.collectorID})`,
                    rating: rating.rating,
                    comments: rating.comments,
                    datetime: (() => {
                        const date = new Date(rating.created_at);
                        const day = date.getDate(); // Get the day
                        const month = date.toLocaleString('en-US', { month: 'long' }); // Get full month name
                        const year = date.getFullYear(); // Get the year
                        let hours = date.getHours(); // Get hours (24-hour format)
                        const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad minutes with '0' if needed
                        const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
                    
                        if (hours > 12) {
                            hours -= 12; // Convert to 12-hour format
                        }
                        if (hours === 0) {
                            hours = 12; // Handle midnight (00:00)
                        }
                        
                        const formattedHours = hours.toString().padStart(2, '0'); // Pad hours if needed
                        return `${day} ${month} ${year} ${formattedHours}:${minutes}${period}`;
                    })(),
                    remarks: "NIL"
                };

                combinedData.push(activity);
            }

            // report activities
            for (let i = 0; i < reportData.length; i++) {
                const report = reportData[i];

                const selectedCompany = companies.find(company => company.id === report.collector_id);
                const companyName = selectedCompany ? selectedCompany.name : "Unknown Company";

                const activity = {
                    serial_no: ratingData.length+i,
                    activity_type: "Reporting Collector",
                    content: `Reported ${companyName} (Collector ID: ${report.collector_id})`,
                    reason: report.reason,
                    comments: report.comments,
                    datetime: (() => {
                        const date = new Date(report.created_at);
                        const day = date.getDate(); // Get the day
                        const month = date.toLocaleString('en-US', { month: 'long' }); // Get full month name
                        const year = date.getFullYear(); // Get the year
                        let hours = date.getHours(); // Get hours (24-hour format)
                        const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad minutes with '0' if needed
                        const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
                    
                        if (hours > 12) {
                            hours -= 12; // Convert to 12-hour format
                        }
                        if (hours === 0) {
                            hours = 12; // Handle midnight (00:00)
                        }
                        
                        const formattedHours = hours.toString().padStart(2, '0'); // Pad hours if needed
                        return `${day} ${month} ${year} ${formattedHours}:${minutes}${period}`;
                    })(),
                    remarks: "NIL"
                };

                combinedData.push(activity);
            }

            setData(combinedData);
        }
    }, [ratingData, companies]);
    

    const [currentPage, setCurrentPage] =  useState(1);
    const activitiesPerPage = 4;
    const lastIndex = currentPage * activitiesPerPage;
    const firstIndex = lastIndex - activitiesPerPage;
    const totalPages = Math.ceil(data.length / activitiesPerPage);

    const currentActivities = data.slice(firstIndex, lastIndex);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
  
    // Go to the next page
    const nextPage = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    // Go to the previous page
    const prevPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    return (
        <div className="w-full h-full">
            <Navbar_GeneralUser />
            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[70vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] text-left">Display Activities Done</h1>
            </div>
            <div className="flex justify-between items-center mb-4">
            <div className="flex justify-start">
            <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 rounded-full px-2 py-2 font-poppins font-semibold ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#CAC386]'}`}>
                <ChevronLeftIcon className="h-20 w-20 stroke-2" />
            </button>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 rounded-full px-2 py-2 font-poppins font-semibold ${
                        currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#CAC386]'
                    }`}>
                    <ChevronRightIcon className="h-20 w-20 stroke-2" />
                </button>
            </div>
            </div>
            <div className="pl-10 lg:ml-20 pr-10 pb-10 w-[90%] overflow-x-auto lg:overflow-visible">
            <table class="table-auto text-left bg-white rounded-3xl font-poppins lg:mt-[-250px] ml-auto mr-auto shadow-2xl">
                <thead>
                    <tr>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center border-b border-r border-[#937070]">S/N</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center border-b border-r border-[#937070]">ACTIVITY TYPE</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center border-b border-r border-[#937070]">CONTENT</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center border-b border-r border-[#937070]">DATE & TIME</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center border-b border-[#937070]">REMARKS</th>
                    </tr>
                </thead>
                
                {
                    currentActivities.length > 0 &&
                
                    <tbody>
                    {currentActivities.map((activity, index) => (
                        <tr key={index}>
                            <td className={"p-4 text-black font-semibold border-r border-[#937070] " + (index === currentActivities.length - 1 ? "border-b-0" : "border-b")}>{activity.serial_no}</td>
                            <td className={"p-4 text-black font-semibold border-r border-[#937070] " + (index === currentActivities.length - 1 ? "border-b-0" : "border-b")}>{activity.activity_type}</td>
                            <td className={"p-4 text-black font-semibold w-[40%] border-r border-[#937070] " + (index === currentActivities.length - 1 ? "border-b-0" : "border-b")}>{activity.content}
                                <p className="font-light italic">
                                    {activity.activity_type === 'Reporting Collector' ? 
                                    <p>Reason: {activity.reason}<br />Comments: {activity.comments}</p> : activity.activity_type === 'Rating Collector' ? 
                                    <p>Rating: {activity.rating}/5<br />Comments: {activity.comments}</p>  : 'N/A'} 
                                </p>
                            </td>
                            <td className={"p-4 text-black text-center border-b border-r border-[#937070] " + (index === currentActivities.length - 1 ? "border-b-0" : "border-b")}>{activity.datetime}</td>
                            <td className={"p-4 text-black font-semibold text-center border-[#937070] " + (index === currentActivities.length - 1 ? "border-b-0" : "border-b")}>
                                <p className="font-light italic">
                                    {activity.remarks === 'Not Contacted' ? 
                                    <button className="rounded-lg bg-[#BE2D08] w-full text-white p-3 font-medium" disabled>{activity.remarks}</button> : activity.remarks === 'Contacted' ? 
                                    <button className="rounded-lg bg-[#016A70] w-full text-white p-3 font-medium" disabled>{activity.remarks}</button> : <button className="rounded-lg bg-[#8A9394] text-white p-3 font-medium w-full" disabled>{activity.remarks}</button>} 
                                </p>
                            </td>
                        </tr>
                    ))} 
                    </tbody>
                }

                {
                    currentActivities.length == 0 &&
                
                    <tbody>
                        <tr>
                            <td colSpan={5} className="p-[200px] italic text-2xl text-[#ACABAB] font-semibold">No activities done. Any comments/ratings/reports made will be shown here.</td> 
                        </tr>
                    </tbody>
                }
            </table>
            </div>
            <div className="mt-[200px]">
                <Footer />
            </div>
        </div>
    )
}




export default Activities;