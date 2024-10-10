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

            {/* if user trying to access pages that doesn't exist! */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
