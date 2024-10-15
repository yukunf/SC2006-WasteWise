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
import SearchByFilters_PublicUser from './pages/SearchByFilter_PublicUser';
import AfterFilter_PublicUser from './pages/AfterFilter_PublicUser';
import Error404 from './pages/Error404';
import Contact from './pages/Contact';

import Home_GeneralUser from './pages/Home_GeneralUser';
import Home_Regulator from './pages/Home_Regulator';
import Home_Collector from './pages/Home_Collector';
import SearchByFilters_GeneralUser from './pages/SearchByFilter_GeneralUser';
import AfterFilter_GeneralUser from './pages/AfterFilter_GeneralUser';

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
import PrivateRoute from './components/PrivateRoute';


function App() {

  const role = localStorage.getItem('role')
  console.log("this my role", role)

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
            <Route path="/filter-public" element={<SearchByFilters_PublicUser />} />
            <Route path="/after-filter-public" element={<AfterFilter_PublicUser />} />
            <Route path="/display/:name" element={<Display />} />
            <Route path="/contact" element={<Contact />} />

            {role === 'general' &&
                <>
                <Route path="/activities" element={<PrivateRoute element={Activities} />} />
                <Route path="/Home_GeneralUser" element={<PrivateRoute element={Home_GeneralUser} />} />
                <Route path="/SearchByFilter_GeneralUser" element={<PrivateRoute element={SearchByFilters_GeneralUser} />} />
                <Route path="/AfterFilter_GeneralUser" element={<PrivateRoute element={AfterFilter_GeneralUser} />} />
                <Route path="/updategeneralprofile" element={<PrivateRoute element={UpdateGeneralProfile} />} />
                <Route path="/generalprofilepage" element={<PrivateRoute element={GeneralProfilePage} />} />
                <Route path="/rating" element={<PrivateRoute element={Rating} />} />
                <Route path="/userreport/:name" element={<PrivateRoute element={UserReport} />} />
                
                </>
            }

            {role === 'collector' &&
                <>
                  <Route path="/Home_Collector" element={<PrivateRoute element={Home_Collector} />} />
                  <Route path="/CollectorMainProfile" element={<PrivateRoute element={CollectorMainProfile} />} />
                  <Route path="/UpdateCollectorMainProfile" element={<PrivateRoute element={UpdateCollectorMainProfile} />} />
                  <Route path="/updatecollectorprofile" element={<PrivateRoute element={UpdateCollectorProfile} />} />
                  <Route path="/collectorprofilepage" element={<PrivateRoute element={CollectorProfilePage} />} />
                </>
            }

            {role === 'regulator' &&
                <>
                  <Route path="/remove" element={<PrivateRoute element={Remove} />} />
                  <Route path="/listreport" element={<PrivateRoute element={ListReport} />} />
                  <Route path="/report" element={<PrivateRoute element={Report} />} />
                  <Route path="/Home_Regulator" element={<PrivateRoute element={Home_Regulator} />} />
                </>
            }
            {/* if user trying to access pages that doesn't exist! */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
