import React from "react";
import { Link } from 'react-router-dom'; // Make sure this import is here
import Footer from "../components/Footer";
import NavBar_PublicUser from "../components/NavBar_PublicUser"; // Import the Navbar

const maleIcon = require("../images/maleIcon.png");
const icon1 = require("../images/icon1.png");
const icon2 = require("../images/icon2.png");
const icon3 = require("../images/icon3.png");
const ellipse = require("../images/ellipse.png");


const Home_PublicUser = () => {
    return (
        <div className="w-full h-full">
            {/* Navbar Component */}
            <NavBar_PublicUser />

            {/* Content of your page */}
            <div className="flex flex-col lg:flex-row bg-[#016a70]" style={{paddingLeft:"10%", paddingRight:"10%", paddingTop:"100px"}}>
                <div className="flex-initial flex flex-col w-full lg:w-1/2 pt-4 ssm:pt-0 mt-[100px]">
                    <h3 className="w-full lg:w-[656px] text-white text-[28px] font-semibold font-poppins text-left">Hi!</h3>
                    <h2 className="w-full lg:w-[656px] text-[#ffffdd] text-5xl font-bold font-poppins mt-2 text-left">
                        Find the Right Collector, Reduce Waste Smarter.
                    </h2>
                    <p className="w-full lg:w-[654px] h-auto text-white text-base font-normal font-poppins mt-4 text-left">
                        Empowering communities with efficient waste management solutions.
                    </p>
                    
                    {/* Adjusted space and button width */}
                    <div className="pt-20"> {/* Increased margin for more space */}
                        <Link 
                            to="/login" 
                            className="inline-flex justify-center items-center gap-[10px] px-[12px] py-[8px] text-white font-semibold rounded-[10px]"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                                borderRadius: "10px",
                                border: "2px solid #FFF", // White border
                                color: "#FFF", // White text color
                                //fontFamily: "Poppins",
                                fontSize: "16px",
                                fontWeight: "600",
                                backgroundColor: "#016A70", // Green background color
                                width: "150px", // Set a specific width for the button
                                textAlign: "center", // Center the text within the button
                            }}
                        >
                            Login
                        </Link>
                    </div>
                </div>

                <div className="flex-initial flex justify-center items-center p-[130px]">
                    <img src={maleIcon} className="lg:ml-[200px]" alt="Icon" />
                </div>
            </div>

            <div className="h-auto w-full bg-white pt-20 pb-20">
                <div className="flex flex-wrap justify-center gap-10 px-10">
                    <div className="bg-white p-5 w-[300px] text-center">
                        <h3 className="text-4xl font-semibold" style={{ 
                                color: 'var(--Dark, #222831)', 
                                //fontFamily: 'Poppins', 
                                fontSize: '48px', 
                                fontWeight: '600', 
                                lineHeight: 'normal' 
                            }}>
                            314
                        </h3>
                        <p className="text-2xl font-semibold" style={{ 
                                color: 'var(--Dark, #222831)', 
                                //fontFamily: 'Poppins', 
                                fontSize: '28px', 
                                fontWeight: '600', 
                                lineHeight: 'normal' 
                            }}>
                            Waste Collectors
                        </p>
                    </div>

                    <div className="bg-white p-5 w-[300px] text-center">
                        <h3 className="text-4xl font-semibold" style={{ 
                                color: 'var(--Dark, #222831)', 
                                //fontFamily: 'Poppins', 
                                fontSize: '48px', 
                                fontWeight: '600', 
                                lineHeight: 'normal' 
                            }}>
                            100k
                        </h3>
                        <p className="text-2xl font-semibold" style={{ 
                                color: 'var(--Dark, #222831)', 
                                //fontFamily: 'Poppins', 
                                fontSize: '28px', 
                                fontWeight: '600', 
                                lineHeight: 'normal' 
                            }}>
                            Users
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-auto w-full bg-white pt-1 pb-1">
                <h2 
                    className="text-center mb-10" 
                    style={{ 
                        color: 'var(--Dark, #222831)', 
                        fontSize: '36px', 
                        fontWeight: '600', 
                        lineHeight: 'normal' 
                    }}
                >
                    Empowering Smarter Waste Solutions
                </h2>
            </div>

            <div className="h-auto w-full bg-white pt-20 pb-20">
                <div className="flex flex-wrap justify-center gap-10 px-10">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[300px] text-center">
                        
                        <div 
                            style={{ 
                                display: 'flex', 
                                width: '80px', 
                                height: '80px', 
                                padding: '8.565px 2.859px 8.571px 2.857px', 
                                justifyContent: 'center', 
                                alignItems: 'center' ,
                                margin: '0 auto' // Center the icon container
                            }}
                        >
                            <img 
                                src={icon1} 
                                className="w-auto h-auto" // Adjust width and height if needed
                                alt="Icon" 
                                style={{ 
                                    maxWidth: '100%', // Ensures the image doesn't exceed the container
                                    maxHeight: '100%', // Ensures the image doesn't exceed the container
                                    objectFit: 'contain' // Keeps the aspect ratio of the image
                                }} 
                            />
                        </div>

                        <h3 className="text-xl font-semibold">Effortless Waste Management</h3>
                        <p>Discover the most suitable waste collection services in your area with ease.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[300px] text-center">
                    <div 
                            style={{ 
                                display: 'flex', 
                                width: '80px', 
                                height: '80px', 
                                padding: '8.565px 2.859px 8.571px 2.857px', 
                                justifyContent: 'center', 
                                alignItems: 'center' ,
                                margin: '0 auto' // Center the icon container
                            }}
                        >
                            <img 
                                src={icon2} 
                                className="w-auto h-auto" // Adjust width and height if needed
                                alt="Icon" 
                                style={{ 
                                    maxWidth: '100%', // Ensures the image doesn't exceed the container
                                    maxHeight: '100%', // Ensures the image doesn't exceed the container
                                    objectFit: 'contain' // Keeps the aspect ratio of the image
                                }} 
                            />
                        </div>
                        <h3 className="text-xl font-semibold">Smart Search Options</h3>
                        <p>Advanced search filtering tools allow you to find waste collectors by name, location, or license class.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[300px] text-center">
                    <div 
                            style={{ 
                                display: 'flex', 
                                width: '80px', 
                                height: '80px', 
                                padding: '8.565px 2.859px 8.571px 2.857px', 
                                justifyContent: 'center', 
                                alignItems: 'center' ,
                                margin: '0 auto' // Center the icon container
                            }}
                        >
                            <img 
                                src={icon3} 
                                className="w-auto h-auto" // Adjust width and height if needed
                                alt="Icon" 
                                style={{ 
                                    maxWidth: '100%', // Ensures the image doesn't exceed the container
                                    maxHeight: '100%', // Ensures the image doesn't exceed the container
                                    objectFit: 'contain' // Keeps the aspect ratio of the image
                                }} 
                            />
                        </div>
                        <h3 className="text-xl font-semibold">Rate and Review</h3>
                        <p>Engage with the community by leaving reviews to help improve the quality of services.</p>
                    </div>
                </div>

                <div className="relative flex flex-col items-center mt-20"> {/* Centering the container */}
                    
                    
                    <div className="bg-white bg-opacity-0 p-5"> {/* Adjust opacity for transparency */}
                        <div className="flex flex-col items-start text-left mt-20"> {/* Align items to start */}
                            <h2 className="text-xl font-bold">Find your desired waste collector</h2>
                            <p className="mt-2">Access detailed information, including contact numbers and licensing details, all in one place.</p>
                            <Link 
                                to="/search-public" 
                                className="inline-flex justify-center items-center gap-[10px] px-[20px] py-[8px] text-[#393E46] font-semibold rounded-[8px] mt-5"
                                style={{
                                    background: "var(--Background-Default-Default, #FFF)",
                                    border: "2px solid var(--Dark, #222831)",
                                    width: "209px",
                                    height: "52px",
                                    flexShrink: 0,
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "normal",
                                }}
                            >
                                Search
                            </Link>
                        </div>
                    </div>
                    <img 
                        src={ellipse} // Replace with your actual icon source
                        alt="Background Icon"
                        className="absolute top-0 left-40 w-1/4" // Adjust size and opacity as needed
                    />
                    
                </div>

            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home_PublicUser;
