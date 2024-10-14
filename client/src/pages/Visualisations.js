import React, { useEffect, useState } from "react";
import MyMap from "../components/Map";
import Footer from "../components/Footer";
import Navbar_PublicUser from "../components/NavBar_PublicUser";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";

const femaleIcon = require("../images/femaleIcon.png")

const Visualisations = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // every logged in user will have own token
        const token = localStorage.getItem('token')

        if (token) {
            setIsAuthenticated(true)
        }

        else {
            setIsAuthenticated(false)
        }
    }, [])

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
            .then(data => {
                setData(data.result.records);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        }, []);

        // if (loading) return <p className='text-center text-gray-600 italic text-lg'>Loading...</p>;
        if (error) return <p className="text-center text-red-600 font-bold text-lg">Error fetching data: {error.message}</p>;
        console.log("hello my data", data);

    return (
        <div className="w-screen lg:w-full h-full">
        
        {isAuthenticated ? <Navbar_GeneralUser /> : <Navbar_PublicUser />}
        <div className="flex flex-col lg:flex-row bg-[#016a70]" style={{paddingLeft:"10%",paddingRight:"10%",paddingTop:"50px"}}>
            <div className="flex-initial flex justify-center items-center p-[130px]">
                <img src={femaleIcon} className="lg:mr-[150px]"></img>
            </div>
            <div className="flex-initial flex flex-col w-full lg:w-1/2 pt-4 ssm:pt-0 mt-[50px]">
                <h2 className="w-full lg:w-[656px] text-[#ffffdd] text-5xl lg:text-7xl text-right font-black font-poppins mt-10 p-5">WHERE ARE THE <br/> COLLECTORS LOCATED?</h2>
            </div> 
        </div>
        <div className="w-full">
            <MyMap data={data} />
        </div>
        <div className="mt-[1000px] lg:mt-[200px]">
            <Footer />
        </div>
    </div>
    )
}

export default Visualisations;