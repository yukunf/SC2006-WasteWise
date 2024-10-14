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
import Search_PublicUser from './pages/Search_PublicUser';
import SearchByFilters_PublicUser from './pages/SearchByFilter_PublicUser';
import AfterFilter_PublicUser from './pages/AfterFilter_PublicUser';
import Display_PublicUser from './pages/Display_PublicUser';
import Error404 from './pages/Error404';
import Contact from './pages/Contact';

import Home_GeneralUser from './pages/Home_GeneralUser';
import Home_Regulator from './pages/Home_Regulator';
import Home_Collector from './pages/Home_Collector';
import Search_GeneralUser from './pages/Search_GeneralUser';
import SearchByFilters_GeneralUser from './pages/SearchByFilter_GeneralUser';
import AfterFilter_GeneralUser from './pages/AfterFilter_GeneralUser';
import Display_GeneralUser from './pages/Display_GeneralUser';

import Report from './pages/report';
import Remove from './pages/remove';
import Listreport from './pages/listreport';
import Rating from './pages/rating';
import UserReport from './pages/userreport';

import UpdateGeneralProfile from './pages/UpdateGeneralProfile';
import GeneralProfilePage from './pages/GeneralProfilePage';
import UpdateCollectorProfile from './pages/UpdateCollectorProfile';
import CollectorProfilePage from './pages/CollectorProfilePage';

import UpdateCollectorMainProfile from './pages/UpdateCollectorMainProfile';

import CollectorMainProfile from './pages/CollectorMainProfile';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home_PublicUser />} />
            <Route path="/visualisations" element={<Visualisations />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/general-registration" element={<GeneralRegistration />} />
            <Route path="/collector-registration" element={<CollectorRegistration />} />
            <Route path="/search-public" element={<Search_PublicUser />} />
            <Route path="/filter-public" element={<SearchByFilters_PublicUser />} />
            <Route path="/after-filter-public" element={<AfterFilter_PublicUser />} />
            <Route path="/display-info-public/:name" element={<Display_PublicUser />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<Report />} />
            <Route path="/remove" element={<Remove />} />
            <Route path="/listreport" element={<Listreport />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/CollectorMainProfile" element={<CollectorMainProfile />} />
            <Route path="/UpdateCollectorMainProfile" element={<UpdateCollectorMainProfile />} />            

          <Route path="/Home_GeneralUser" element={<Home_GeneralUser />} />
          <Route path="/Home_Regulator" element={<Home_Regulator />} />
          <Route path="/Home_Collector" element={<Home_Collector />} />
          <Route path="/Search_GeneralUser" element={<Search_GeneralUser />} />
          <Route path="/SearchByFilter_GeneralUser" element={<SearchByFilters_GeneralUser />} />
          <Route path="/AfterFilter_GeneralUser" element={<AfterFilter_GeneralUser />} />
          <Route path="/Display_GeneralUser" element={<Display_GeneralUser />} />

          <Route path="/updategeneralprofile" element={<UpdateGeneralProfile />} />
          <Route path="/generalprofilepage" element={<GeneralProfilePage />} />
          <Route path="/updatecollectorprofile" element={<UpdateCollectorProfile />} />
          <Route path="/collectorprofilepage" element={<CollectorProfilePage />} />

            {/* if user trying to access pages that doesn't exist! */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
