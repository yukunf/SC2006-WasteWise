import React, { useEffect, useState } from "react";
import MyMap from "../components/Map";
import Footer from "../components/Footer";
import Navbar_PublicUser from "../components/NavBar_PublicUser";
import Navbar_GeneralUser from "../components/NavBar_GeneralUser";

const femaleIcon = require("../images/femaleIcon.png")

const Visualisations = () => {
    const [collectors, setCollectors] = useState([]);
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
        const fetchCollectors = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/collectors`, {
                    method: 'GET',
                    headers: {
                        // 'Authorization': `Token ${localStorage.getItem('token')}`, // Include the token for authentication
                        'Content-Type': 'application/json',
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('Collector details:', data);
                    setCollectors(data)
                } else {
                    const errorData = await response.json();
                    setError(errorData.error); // Display error message if retrieval fails
                    console.error('Retrieval error:', errorData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchCollectors();

    }, []);

    console.log("collector", collectors)


    // if (loading) return <p className='text-center text-gray-600 italic text-lg'>Loading...</p>;
    if (error) return <p className="text-center text-red-600 font-bold text-lg">Error fetching data: {error.message}</p>;

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
            <MyMap data={collectors} />
        </div>
        <div className="mt-[1000px] lg:mt-[200px]">
            <Footer />
        </div>
    </div>
    )
}

export default Visualisations;