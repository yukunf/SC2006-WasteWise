import logo from './logo.svg';
import './App.css';

// main font used
import "@fontsource/poppins"; 
import "@fontsource/poppins/700.css"; 
import "@fontsource/poppins/400-italic.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home_PublicUser from './pages/Home_PublicUser';
import Visualisations from './pages/Visualisations';
import Activities from './pages/Activities';
import Login from './pages/Login';
import GeneralRegistration from './pages/GeneralRegistration';
import CollectorRegistration from './pages/CollectorRegistration';
import Error404 from './pages/Error404';
import Contact from './pages/Contact';

import Home_GeneralUser from './pages/Home_GeneralUser';
import Home_Regulator from './pages/Home_Regulator';
import Home_Collector from './pages/Home_Collector';

import Report from './pages/Report';
import Remove from './pages/Remove';
import ListReport from './pages/ListReport';
import Rating from './pages/Rating';
import UserReport from './pages/UserReport';

import UpdateGeneralProfile from './pages/UpdateGeneralProfile';
import GeneralProfilePage from './pages/GeneralProfilePage';
import UpdateCollectorProfile from './pages/UpdateCollectorProfile';
import CollectorProfilePage from './pages/CollectorProfilePage';

import UpdateCollectorMainProfile from './pages/UpdateCollectorMainProfile';

import CollectorMainProfile from './pages/CollectorMainProfile';
import Search from './pages/Search';
import Display from './pages/Display';
import GeneralRoute from './components/GeneralRoute';
import CollectorRoute from './components/CollectorRoute';
import RegulatorRoute from './components/RegulatorRoute';
import SearchByFilter from './pages/SearchByFilter';
import AfterFilter from './pages/AfterFilter';


function App() {
  // localStorage.clear()
  console.log("user", localStorage)
  console.log('Token from localStorage:', localStorage.getItem('token'));

  return (
    <div className="App">
      <Router>
        <div>
        <Routes>
            <Route path="/" element={<Home_PublicUser />} />
            <Route path="/visualisations" element={<Visualisations />} />
            <Route path="/login" element={<Login />} />
            <Route path="/general-registration" element={<GeneralRegistration />} />
            <Route path="/collector-registration" element={<CollectorRegistration />} />
            <Route path="/search" element={<Search />} />
            <Route path="/filter" element={<SearchByFilter />} />
            <Route path="/afterfilter" element={<AfterFilter />} />
            <Route path="/display/:id" element={<Display />} />
            <Route path="/contact" element={<Contact />} />


            <Route path="/activities" element={<GeneralRoute element={Activities} />} />
            <Route path="/Home_GeneralUser" element={<GeneralRoute element={Home_GeneralUser} />} />
            <Route path="/updategeneralprofile" element={<GeneralRoute element={UpdateGeneralProfile} />} />
            <Route path="/generalprofilepage" element={<GeneralRoute element={GeneralProfilePage} />} />
            <Route path="/rating" element={<GeneralRoute element={Rating} />} />
            <Route path="/userreport/:id" element={<GeneralRoute element={UserReport} />} />
                
               
            <Route path="/Home_Collector" element={<CollectorRoute element={Home_Collector} />} />
            <Route path="/CollectorMainProfile" element={<CollectorRoute element={CollectorMainProfile} />} />
            <Route path="/UpdateCollectorMainProfile" element={<CollectorRoute element={UpdateCollectorMainProfile} />} />
            <Route path="/updatecollectorprofile" element={<CollectorRoute element={UpdateCollectorProfile} />} />
            <Route path="/collectorprofilepage" element={<CollectorRoute element={CollectorProfilePage} />} />


            <Route path="/remove" element={<RegulatorRoute element={Remove} />} />
            <Route path="/listreport" element={<RegulatorRoute element={ListReport} />} />
            <Route path="/report" element={<RegulatorRoute element={Report} />} />
            <Route path="/Home_Regulator" element={<RegulatorRoute element={Home_Regulator} />} />

            {/* if user trying to access pages that doesn't exist! */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
