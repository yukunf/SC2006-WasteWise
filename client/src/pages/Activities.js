import React, { useState } from "react";
import Footer from "../components/Footer";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Activities = () => {

    const data = [
        {
            serial_no : 1,
            activity_type : "Reporting Collector",
            content : "Reported E Waste123",
            reason : "E Waste 123 took a long time before processing my request. \
                        They also only informed on the spot on some of the items not being able to proceed. Bad service.",
            datetime : "27 August 2024 \
                          16:21PM",
            remarks : "Contacted"
        },
        {
            serial_no : 2,
            activity_type : "Rating Collector",
            content : "Rated 800 SUPER WASTE MGMT PTE LTD",
            rating: 4,
            comments: "Good service, hassle-free!!",
            datetime : "28 August 2024 \
                          13:43PM",
            remarks : "NIL"
        },
        {
            serial_no : 3,
            activity_type : "Rating Collector",
            content : "Rated AEON EARTH PTE LTD",
            rating: 3,
            comments: "Did the work as commissioned, however, the process could have been smoother if they were a little less rude :(",
            datetime : "31 August 2024 \
                          10:11AM",
            remarks : "NIL"
        },
        {
            serial_no : 4,
            activity_type : "Reporting Collector",
            content : "Reported Wasteboo",
            reason : "Wasteboo bailed on me at the last minute. \
                      Process was very messy, took very while to inform me that they couldn’t make it ???? BAD SERVICE !! :((",
            datetime : "2 September 2024 \
                          20:21PM",
            remarks : "Not Contacted"
        },
        {
            serial_no : 5,
            activity_type : "Rating Collector",
            content : "Rated CP",
            rating: 0,
            comments : "You just want attention. \
                      I knew from the start, \
                      you're just making sure I'm never gettin' over you :((",
            datetime : "30 September 2024 \
                          19:37PM",
            remarks : "NIL"
        },
    ]

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
            <div className="flex flex-col lg:flex-row bg-[#016a70] h-[70vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px]">Display Activities Done</h1>
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
            <table class="table-auto text-left bg-white rounded-3xl font-poppins lg:mt-[-200px] ml-auto mr-auto shadow-2xl">
                <thead>
                    <tr>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center">S/N</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center">ACTIVITY TYPE</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center">CONTENT</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center">DATE & TIME</th>
                        <th className="p-4 text-[#016a70] font-bold text-base text-center">REMARKS</th>
                    </tr>
                </thead>
                
                {
                    currentActivities.length > 0 &&
                
                    <tbody>
                    {currentActivities.map((activity, index) => (
                        <tr key={index}>
                            <td className="p-4 text-black font-semibold">{activity.serial_no}</td>
                            <td className="p-4 text-black font-semibold">{activity.activity_type}</td>
                            <td className="p-4 text-black font-semibold w-[40%]">{activity.content}
                                <p className="font-light italic">
                                    {activity.activity_type === 'Reporting Collector' ? 
                                    <p>Reason: {activity.reason}</p> : activity.activity_type === 'Rating Collector' ? 
                                    <p>Rating: {activity.rating}/5<br />Comments: {activity.comments}</p>  : 'N/A'} 
                                </p>
                            </td>
                            <td className="p-4 text-black text-center">{activity.datetime}</td>
                            <td className="p-4 text-black font-semibold text-center">
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