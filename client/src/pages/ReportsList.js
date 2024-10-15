import React, { useState, useEffect } from 'react';

const ReportsList = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('http://localhost:8000/reports/');  // Adjust URL as needed
                const data = await response.json();
                setReports(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Reports</h2>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>
                        <p>Collector: {report.collector}</p>
                        <p>Reason: {report.reason}</p>
                        <p>Comments: {report.comments}</p>
                        <p>Submitted By: {report.user}</p>
                        <p>Created At: {new Date(report.created_at).toLocaleString()}</p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportsList;
