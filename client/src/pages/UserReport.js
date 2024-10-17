import React, { useEffect, useState } from "react";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';


const UserReport = () => {
    const [rating, setRating] = useState("");
    const [collector, setCollector] = useState([])
    const [collectorName, setCollectorName] = useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const { id } = useParams();

    

    useEffect(() => {
        const datasetId = "d_26afdd562f28b4acecb400c10b70f013";
        const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}&limit=314`;

        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
            })
            .then(companies => {
                setCollector(companies.result.records);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        }, []);

    // console.log("col", collector)

    useEffect(() => {
        if (id && collector.length > 0) {
            const chosenCompany = collector.find((c) => c._id === parseInt(id, 10));
            setCollectorName(chosenCompany ? chosenCompany.company_name : null); // Handle company not found
        }
    }, [id, collector]); 


    return (
        <div className="w-full h-full">
            <Navbar_GeneralUser collectorName={collectorName} />
            <div className="flex flex-col bg-[#016a70] h-[20vh]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}></div>
            <div className="mt-20 pl-20">
                <p className="text-lg text-bold text-left pl-20">Collector Name</p>
                <div className="bg-white font-bold rounded-lg p-3 w-[50%] max-w-3xl z-20 border text-left ml-14 mt-1">
                    <p>{collectorName}</p>
                </div>
                <p className="text-lg text-bold text-left pl-20 mt-12">Reason</p>
                <select className="w-[42%] p-2 border border-grey-300 rounded mb-4 mt-2" style={{ marginLeft: '-52%' }} value={rating} onChange={handleRatingChange}>
                    <option value="" disabled className="text-gray-100">Select reason</option>
                    <option value="Poor service">Poor service</option>
                    <option value="Bad communication">Bad communication</option>
                    <option value="Slow response">Slow response</option>
                    <option value="Lack professionalism">Lack professionalism</option>
                </select>
                <div className="mt-12">
                    <p className="text-lg text-bold text-left pl-20 mt-12">Comments</p>
                    <div className="flex items-center">
                        <textarea className="mr-12 w-[42%] mt-1 p-2 border border-grey-300 rounded" rows="4" placeholder="Enter your comments" style={{ marginLeft: '3%' }}></textarea>
                        <button className="mt-12 ml-12 mr-12 rounded-lg bg-[#016A70] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium" onClick={() => alert('Submitted!')}>Submit</button>
                        <Link to='/rating'><button className="mt-12 ml-12 rounded-lg bg-[#747474] w-[251px] h-[52px] shadow-xl text-white p-3 font-medium">BACK</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserReport;