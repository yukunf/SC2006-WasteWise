import React from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';

const wastewiseLogo = require("../images/logo_master.png");

const Navbar_GeneralUser = ( {collectorName}) => {
    const location = useLocation(); // Get the current location
    console.log('gen', collectorName)

    const navigate = useNavigate();

    const handleLogout = () => {
        // remove every info saved from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user_id'); 
        localStorage.removeItem('email');
        localStorage.removeItem('collector_id'); 
        localStorage.removeItem('role');

        // localStorage.clear();
    
        // Redirect to the login page after logging out
        navigate('/login');
    };

    return (
        <nav
            className="flex justify-between items-center fixed left-0 right-0 mx-auto z-10" 
            style={{
                width: "1412px",
                height: "80px",
                borderRadius: "20px",
                backgroundColor: "#FFF", // Using the provided background color
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", // Box shadow
                flexShrink: 0,
                top: "40px" // Adjust its distance from the top
            }}
        >
            {/* Logo */}
            <div className="flex items-center ml-10">
                <img src={wastewiseLogo} alt="Wastewise Logo" style={{ width: "105px", height: "31.457px", flexShrink: 0 }} />
            </div>

            {/* Centered Navigation Links */}
            <ul className="flex space-x-10 text-center">
                {/* Home Link */}
                <li>
                    <Link
                        to="/Home_GeneralUser"
                        className={`text-lg font-semibold ${location.pathname === '/Home_GeneralUser' ? 'text-[#016a70]' : 'text-[#393E46]'} hover:text-[#004f57]`}
                    >
                        Home
                    </Link>
                </li>
                {/* Search Link */}
                <li>
                    <Link
                        to="/search"
                        className={`text-lg font-semibold ${(location.pathname === '/search' || location.pathname === '/filter' || location.pathname === '/afterfilter' || location.pathname.includes('/display/')) ? 'text-[#016a70]' : 'text-[#393E46]'} hover:text-[#004f57]`}
                    >
                        Search
                    </Link>
                </li>
                {/* Visualisations Link */}
                <li>
                    <Link
                        to="/visualisations"
                        className={`text-lg font-semibold ${location.pathname === '/visualisations' ? 'text-[#016a70]' : 'text-[#393E46]'} hover:text-[#004f57]`}
                    >
                        Visualisations
                    </Link>
                </li>
                {/* Rate Link */}
                <li>
                        <Link
                            to="/rating"
                            className={`text-lg font-semibold ${(location.pathname === '/rating' || location.pathname.includes('/userreport')) ? 'text-[#016a70]' : 'text-[#393E46]'} hover:text-[#004f57]`}
                        >
                            Rate
                        </Link>
                </li>
                {/* Activities Link */}
                <li>
                    <Link
                        to="/Activities"
                        className={`text-lg font-semibold ${location.pathname === '/Activities' ? 'text-[#016a70]' : 'text-[#393E46]'} hover:text-[#004f57]`}
                    >
                        Activities
                    </Link>
                </li>
                {/* Profile Link */}
                <li>
                    <Link
                        to="/GeneralProfilePage"
                        className={`text-lg font-semibold ${location.pathname === '/GeneralProfilePage' ? 'text-[#016a70]' : 'text-[#393E46]'} hover:text-[#004f57]`}
                    >
                        Profile
                    </Link>
                </li>
            </ul>

            {/* LogOut Button */}
            <div className="mr-10">
                <Link 
                    to="/" 
                    className="inline-flex justify-center items-center gap-[10px] px-[20px] py-[8px] text-white font-semibold rounded-[10px]"
                    style={{
                        backgroundColor: "#016A70", // Green background color
                    }}
                    onClick={handleLogout}
                >
                    Log Out
                </Link>
            </div>
        </nav>
    );
};

export default Navbar_GeneralUser;
