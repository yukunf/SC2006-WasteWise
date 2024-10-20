import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet";
import DropdownMapFilter from "./DropdownMapFilter";
import List from "./List";



const MyMap = ( {data} ) => {

    const [selectedRegion, setSelectedRegion] = useState("");
    
    // Fix for default Marker icon import issue in React-Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
    
    const postalCodeRegions = {
        "01": "Central", "02": "Central", "03": "Central", "04": "Central", "05": "Central",
        "06": "Central", "07": "Central", "08": "Central", "09": "Central", "10": "Central",
        "11": "Central", "12": "Central", "13": "Central", "14": "Central", "15": "Central",
        "16": "Central", "17": "Central", "18": "Central", "19": "Central", "20": "Central",
        "21": "Central", "22": "Central", "23": "Central", "24": "Central", "25": "Central",
        "26": "Central", "27": "Central", "28": "Central", "29": "Central",
        "30": "Central", "31": "Central", "32": "Central", "33": "Central",
        "34": "Central", "35": "Central", "36": "Central", "37": "Central",
        "38": "Central", "39": "Central", "40": "Central", "41": "Central", "42": "Central",
        "43": "Central", "44": "Central", "45": "Central", "46": "East", "47": "East",
        "48": "East", "49": "East", "50": "East", "51": "East", "52": "East",
        "53": "North-East", "54": "North-East", "55": "North-East", "56": "North-East",
        "57": "North-East", "58": "Central", "59": "Central", "60": "West",
        "61": "West", "62": "West", "63": "West", "64": "West", "65": "West",
        "66": "West", "67": "West", "68": "West", "69": "West", "70": "West",
        "71": "West", "72": "North", "73": "North", "75": "North",
        "76": "North", "77": "North", "78": "North", "79": "North-East",
        "80": "North-East", "81": "East", "82": "North-East"
    };
      

    const getRegionFromPostalCode = (address) => {
        const postalCodeMatch = address.match(/\b\d{6}\b/); // Match a 6-digit postal code
            if (postalCodeMatch) {
                const postalCodePrefix = postalCodeMatch[0].substring(0, 2); // Extract the first two digits
                return postalCodeRegions[postalCodePrefix];
            }
            return null;
        };
    
    const filterByRegion = (item) => {
        if (!selectedRegion) return true;

        const regionFromPostalCode = getRegionFromPostalCode(item.address);
        if (regionFromPostalCode) {
            return regionFromPostalCode === selectedRegion;
        }

        return false;
    };
      
    
    const filteredData = data.filter(item => filterByRegion(item));
    console.log("ORI FILTER", filteredData.length);
    console.log("ORI data", data.length);


    
    // if locations are at the same place appear in one pop-up
    const groupedMarkers = {};
    filteredData.forEach((record) => {
        const key = `${record.lat},${record.lng}`; 
        if (!groupedMarkers[key]) {
            groupedMarkers[key] = {
                position: [record.lat, record.lng],
                companies: [] 
            };
        }
        groupedMarkers[key].companies.push(record); // add the company to the array for this location
    });

    const markerData = Object.values(groupedMarkers).map(marker => ({
      position: marker.position,
      popupText: marker.companies.map(company => `
          <strong>${company.name || "Unknown Company"}</strong><br />
          <em className="mb-4">${company.address || "No address available"}</em>
          <br/>
        `).join('<br/><hr style="border: 1px solid grey;"/> <br/>') // combine all company info in the popup
    }));

    // console.log(markerData, "wow");

    
    

    
    return (
        <div className="flex flex-col sm:flex-row justify-start items-start h-screen mt-10">
            <div className="lg:w-full w-[90%] h-full bg-white rounded-2xl shadow-2xl lg:ml-[50px] p-2">
                <MapContainer center={[1.3531228072102837, 103.82019829840686]} zoom={12} scrollWheelZoom={true} style={{ height: "80vh", width: "100%", marginTop: "50px", zIndex:1}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerData.map((marker, index) => (
                    <Marker key={index} position={marker.position}>
                    <Popup>
                        <div dangerouslySetInnerHTML={{ __html: marker.popupText }} />
                    </Popup>
                    </Marker>
                ))}
                </MapContainer>
            </div>
            <div className="p-10 w-screen">
              <p className="text-lg font-poppins text-left">Waste collectors are available all around Singapore. Easily navigate through the different regions (North/East/North-East/West/Central) below to see nearby services in that area.</p>
              <DropdownMapFilter 
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                    />
              {filteredData && filteredData.length > 0 ? <List filteredData={filteredData} /> : <h2 className="text-[#008660b2] font-semibold mt-[150px] text-4xl font-poppins">No waste collection services <br /> available in this area</h2>}
            </div>
        </div>
    );
};

export default MyMap;