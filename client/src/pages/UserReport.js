import React, { useState, useEffect } from "react";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";
import { useNavigate } from 'react-router-dom';

const UserReport = () => {
    const [report, setReport] = useState({
        collector_id: '',
        reason: '',
        comments: ''
    });
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [fetchError, setFetchError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');  // Add success message state
    const navigate = useNavigate();

    const [fullName, setFullName] = useState(null);
    const [error, setError] = useState(null);

    // Fetch collector names and IDs from an API
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_26afdd562f28b4acecb400c10b70f013&limit=314');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                const companyData = json.result.records.map(record => ({
                    id: record._id,  // Store only collector ID
                    name: record.company_name,  // Store collector name
                    address: record.company_address,
                    telephone : record.telephone_no
                }));
                setCompanies(companyData);
            } catch (error) {
                setFetchError('Error fetching collector data');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
 
    },
    []);



    const handleSubmit = async () => {
        if (!report.collector_id || !report.reason || !report.comments) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        const userID = localStorage.getItem('user_id');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');

        if (!userID) {
            setErrorMessage('User ID is required. Please log in.');
            return;
        }

        // Find the selected collector (ID and Name only)
        const selectedCollector = companies.find(company => company.id === parseInt(report.collector_id));

        // Store only collector ID and Name
        const reportData = {
            userID: parseInt(userID),
            user_name: userName,
            user_email: userEmail,
            collector_id: selectedCollector.id,
            collector_name: selectedCollector.name,
            collector_telephone: selectedCollector.telephone,
            collector_address: selectedCollector.address,
            reason: report.reason,
            comments: report.comments,
        };

        console.log('selected Collector: ', companies);

        console.log('Report Data:', reportData);  // Log the data being sent

        setErrorMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/reports/submit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(reportData),
            });

            if (response.ok) {
                setSuccessMessage('Report submitted successfully! Redirecting to homepage...');
                setTimeout(() => {
                    navigate('/Home_GeneralUser');
                }, 2000);
            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'Failed to submit the report');
            }
        } catch (error) {
            setErrorMessage('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading collectors...</p>;
    if (fetchError) return <p>{fetchError}</p>;

    return (
        <div className="w-full h-full">
            <Navbar_GeneralUser />

            <div className="flex flex-col bg-[#016a70] h-[20vh]" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "50px" }}></div>

            <div className="flex flex-col justify-center items-center mt-10">
                <div className="bg-white shadow-lg p-10 rounded-lg w-[50%]">
                    <h1 className="text-4xl font-bold text-[#016A70] mb-8 text-center">Submit a New Report</h1>

                    {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>} {/* Display success message */}

                    {/* Dropdown to select the collector */}
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Collector Name</label>
                        <select
                            value={report.collector_id}
                            onChange={(e) => setReport({ ...report, collector_id: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select a Collector</option>
                            {companies.map(company => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Reason</label>
                        <select
                            value={report.reason}
                            onChange={(e) => setReport({ ...report, reason: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select Reason</option>
                            <option value="Poor service">Poor service</option>
                            <option value="Bad communication">Bad communication</option>
                            <option value="Slow response">Slow response</option>
                            <option value="Lack professionalism">Lack professionalism</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2">Comments</label>
                        <textarea
                            value={report.comments}
                            onChange={(e) => setReport({ ...report, comments: e.target.value })}
                            placeholder="Enter your comments"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            rows="4"
                        />
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-[#016A70] hover:bg-teal-800 text-white py-2 px-6 rounded-lg font-semibold"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReport;
