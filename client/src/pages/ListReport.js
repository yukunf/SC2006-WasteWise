import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar_Regulator from "../components/NavBar_Regulator";
import Footer from "../components/Footer";

const ListReport = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [filter, setFilter] = useState('');  // Selected filter (collector name)

    useEffect(() => {
        const fetchReports = async () => {
            setErrorMessage('');
            try {
                const response = await fetch('http://localhost:8000/api/reports/list/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setReports(data);
                } else {
                    setErrorMessage('Failed to load reports.');
                }
            } catch (error) {
                setErrorMessage('Network error. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filter reports based on the selected collector name
    const filteredReports = filter ? reports.filter(report => report.collector_name === filter) : reports;

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col bg-[#016a70] h-[50vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] text-center">List Reports</h1>
                <div className="flex justify-center mt-4">
                    <button className="flex justify-center bg-[#d5d7e1] w-[251px] h-[52px] shadow-xl text-black p-3 font-medium text-bold" disabled>
                        Sort By:
                    </button>
                    <select value={filter} onChange={handleFilterChange} className="ml-2 p-2 border border-gray-300 rounded">
                        <option value="">All Collectors</option>
                        <option value="E WASTE 123">E WASTE 123</option>
                        <option value="800 WASTE COLLECTOR">800 WASTE COLLECTOR</option>
                    </select>                   
                </div>
            </div>

            <div className="flex justify-center">
                <table className="table-auto text-left font-poppins ml-auto mr-auto mt-6">
                    <thead>
                        <tr>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-r border-gray-300">Date Created</th>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-r border-gray-300">Created by User</th>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-r border-gray-300">Reported Collector</th>
                            <th className="p-4 text-black font-bold text-base text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.map((report) => (
                            <tr key={report.id}>
                                <td className="p-4 text-black font-bold border-b border-r border-gray-300">
                                    {new Date(report.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-black font-bold border-b border-r border-gray-300">
                                    {report.user_name || 'N/A'}
                                </td>
                                <td className="p-4 text-black font-bold border-b border-r border-gray-300">
                                    {report.collector_name || 'N/A'}
                                </td>
                                <td className="p-4 text-center">
                                    <Link to={`/report/${report.id}`}>
                                        <button className="bg-white text-blue-500 px-4 py-2 rounded">View Report</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default ListReport;
