import Navbar_Regulator from "../components/NavBar_Regulator";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";

const Listreport = () => {
    const [reports, setReports] = useState([]);  // State to store reports data
    const [loading, setLoading] = useState(true);  // For loading state
    const [error, setError] = useState(null);  // To handle errors

    // Fetch reports data from the backend
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/reports/');  // Adjust the URL to your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch reports");
                }
                const data = await response.json();
                setReports(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col bg-[#016a70] h-[50vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] text-center">List Reports</h1>
            </div>
            <div className="flex justify-center">
                <table className="table-auto text-left font-poppins ml-auto mr-auto">
                    <thead>
                        <tr>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-r border-gray-300">Date Created</th>
                            <th className="p-4 text-black font-bold text-base text-center border-b border-r border-gray-300">Reported Collector</th>
                            <th className="p-4 text-black font-bold text-base text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length === 0 ? (
                            <tr>
                                <td className="p-4 text-black font-bold text-center" colSpan="3">No reports available</td>
                            </tr>
                        ) : (
                            reports.map((report, index) => (
                                <tr key={index}>
                                    <td className="p-4 text-black font-bold border-b border-r border-gray-300">
                                        {new Date(report.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-black font-bold border-b border-gray-300">
                                        {report.collector}
                                    </td>
                                    <td className="p-4 text-center">
                                        <Link to={`/report/${report.id}`}>  {/* Use report.id here */}
                                            <button className="bg-white text-blue-500 px-4 py-2 rounded">View Report</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default ListReport;
