import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const List = ({filteredData}) => {
    // console.log("this is filtered data", filteredData);
    const [currentPage, setCurrentPage] =  useState(1);
    const collectorsPerPage = 4;
    const lastIndex = currentPage * collectorsPerPage;
    const firstIndex = lastIndex - collectorsPerPage;
    const currentCollectors = filteredData.slice(firstIndex, lastIndex);
    const noOfPages = Math.ceil(filteredData.length / collectorsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // reset page to 1st page if region is changed
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData]);


    return (
        <div>
            <table class="table-auto text-left bg-[#d3eded] rounded-3xl font-poppins shadow-2xl">
                <thead>
                    <tr>
                        <th className="p-4 text-[#016a70] font-bold text-lg border-b border-r border-[#937070]">Collectors</th>
                        <th className="p-4 text-[#016a70] font-bold text-lg border-b border-[#937070]">Address</th>
                    </tr>
                </thead>
                <tbody>
                {currentCollectors.map((collector, index) => (
                    <tr key={index}>
                        <td className={"p-4 text-black font-semibold border-r border-[#937070] " + (index === currentCollectors.length - 1 ? "border-b-0" : "border-b")}>{collector.company_name}</td>
                        <td className={"p-4 text-black font-semibold border-[#937070] " + (index === currentCollectors.length - 1 ? "border-b-0" : "border-b")}>{collector.company_address}</td>
                    </tr>
                ))} 
                </tbody>
            </table>
            <Pagination currentPage={currentPage}
                totalPages={noOfPages}
                onPageChange={handlePageChange} />
        </div>
    )
}

export default List;