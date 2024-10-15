import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar_Regulator from '../components/NavBar_Regulator';
import Footer from '../components/Footer';

const ReportDetail = () => {
    const { id } = useParams();  // Get the report ID from the URL
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/reports/${id}/`);  // Fetch report by ID
                if (!response.ok) {
                    throw new Error("Failed to fetch report");
                }
                const data = await response.json();
                setReport(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full h-full">
            <Navbar_Regulator />
            <div className="flex flex-col bg-[#016a70] h-[50vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}>
                <h1 className="text-[#FFFDF7] font-poppins w-full text-7xl font-bold mt-[150px] text-center">Report Details</h1>
            </div>
            <div className="flex flex-col items-center mt-10">
                {report && (
                    <div className="bg-white p-10 shadow-lg rounded-lg w-2/3">
                        <h2 className="text-xl font-bold mb-4">Collector: {report.collector}</h2>
                        <p className="mb-2"><strong>Reason:</strong> {report.reason}</p>
                        <p className="mb-4"><strong>Comments:</strong> {report.comments}</p>
                        <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(report.created_at).toLocaleDateString()}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ReportDetail;
