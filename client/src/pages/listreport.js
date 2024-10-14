import Navbar_Regulator from "../components/NavBar_Regulator";
import {Link} from 'react-router-dom'
import Footer from "../components/Footer";
import React, {useState} from "react";


const Listreport = () => {

    const [companies, setFilter] = useState(" ");

    const filterChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col bg-[#016a70] h-[50vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] text-center">List Reports</h1>
                <div className="flex justify-center mt-4">
                    <button className="flex justify-center bg-[#d5d7e1] w-[251px] h-[52px] shadow-xl text-black p-3 font-medium text-bold" disabled>
                        Sort By:
                    </button>
                    <select value={companies} onChange={filterChange}>
                        <option value="" disabled className="text-grey-100">All Collectors</option>
                        <option value="E WASTE 123">E WASTE 123</option>
                        <option value="E WASTE 123">800 WASTE COLLECTOR</option>
                    </select>                   
                </div>
            </div>
            <div className="flex justify-center">
                <table class="table-auto text-left font-poppins ml-auto mr-auto ">
                    <thead>
                        <tr>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-r border-gray-300">Date Created</th>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-r border-gray-300">Created by User</th>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-gray-300">Reported Collector</th>
                            <th className="p-4 text-black font-bold text-base text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 text-black font-bold border-b border-r border-gray-300">27/08/2024</td>
                            <td className="p-4 text-black font-bold border-b border-r border-gray-300">Sample_User_12345</td>
                            <td className="p-4 text-black font-bold border-b border-gray-300">Sample_Collector_A</td>
                            <td className="p-4 text-center">
                                <Link to='/report'><button className="bg-white text-blue-500 px-4 py-2 rounded">View Report</button></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 text-black font-bold border-b border-r border-gray-300">29/08/2024</td>
                            <td className="p-4 text-black font-bold border-b border-r border-gray-300">Sample_User_67890</td>
                            <td className="p-4 text-black font-bold border-b border-gray-300">Sample_Collector_B</td>
                            <td className="p-4 text-center">
                            <Link to='/report'><button className="bg-white text-blue-500 px-4 py-2 rounded">View Report</button></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Listreport;
