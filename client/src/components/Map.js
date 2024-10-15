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


    const locations = [
      { lat: 1.46764755, lng:	103.8135135 },
      { lat: 1.3723611, lng:	103.9714027 },  
      { lat: 1.313789, lng:	103.878531 }, 
      { lat: 1.320662, lng:	103.6453655 },
      { lat: 1.377054, lng:	103.871024 }, 
      { lat: 1.32734965, lng:	103.6401272 },  
      { lat: 1.37296, lng:	103.925594 },
      { lat: 1.3436811986584059, lng:	103.88375744092556 },  // changed (8)	 	
      { lat: 1.377842, lng:	103.875726 }, 
      { lat: 1.3051558, lng:	103.6953007 }, 
      { lat: 1.374791621466649, lng:	103.77379231748954 }, // changed (11)
      { lat: 1.3783903168936353, lng:	103.76935163536224 },  // changed (12)
      { lat: 1.3770754800747578, lng:	103.7694057641164 },  // changed (13)
      { lat: 1.33968755, lng:	103.6917626 }, 
      { lat: 1.415407, lng:	103.749943 },
      { lat: 1.35916315730081, lng:	103.85660268547848 },  // changed (16)
      { lat: 1.3217653787235704, lng:	103.8668476197861 }, // changed (17)
      { lat: 1.3112401, lng:	103.6724191 },
      { lat: 1.287943, lng:	103.6316023 },
      { lat: 1.312673, lng:	103.720141 },  
      { lat: 1.377842, lng:	103.875726 },
      { lat: 1.32487335, lng:	103.7018865 }, 	 	
      { lat: 1.352275, lng:	103.891094 },
      { lat: 1.4625085834451788, lng:	103.81252918910275 }, // changed (24)
      { lat: 1.280797, lng:	103.8480215 },
      { lat: 1.280797, lng:	103.8480215 }, 
      { lat: 1.307241, lng:	103.855346 }, 
      { lat: 1.429417, lng:	103.748628 }, 
      { lat: 1.274983, lng:	103.631695 },
      { lat: 1.32945245, lng:	103.8972199 },  
      { lat: 1.39229835, lng:	103.9006728 },
      { lat: 1.336823, lng:	103.970023 },
      { lat: 1.336823, lng:	103.970023 },
      { lat: 1.275755, lng:	103.8459004 },  
      { lat: 1.319713523511201, lng:	103.8942642123483 }, // changed (35)
      { lat: 1.3419229, lng:	103.7761729 }, 	 	
      { lat: 1.3501318239332893, lng:	103.71912693279052 }, // changed (37)
      { lat: 1.4234969899613923, lng:	103.74505128440278 },  // changed (38)
      { lat: 1.333799788293127, lng:	103.92828331962806 }, // changed (39)
      { lat: 1.2988104, lng:	103.6648329 }, 
      { lat: 1.42739965, lng:	103.8262934 }, 
      { lat: 1.34183, lng: 103.69839 }, 
      { lat: 1.3464427, lng:	103.7121847 },
      { lat: 1.331403, lng:	103.947895 }, // (44)

      { lat: 1.3309468, lng:	103.8970999 },
      { lat: 1.355352, lng:	103.896308 },
      { lat: 1.3488830805325382, lng:	103.95329026662483 }, // changed (47)
      { lat: 1.446215, lng:	103.773671 },  
      { lat: 1.302641, lng:	103.883177 },
      { lat: 1.3455894, lng:	103.8721039 }, 	 	
      { lat: 1.383541, lng:	103.875355 },
      { lat: 1.322407, lng:	103.6502004 }, 
      { lat: 1.2808278, lng:	103.8204567 },
      { lat: 1.29445325, lng:	103.787048 }, 
      { lat: 1.303384, lng:	103.731492 }, 
      { lat: 1.358659815868121, lng:	103.83356156558138 },  // changed (56)
      { lat: 1.2715617, lng:	103.6347067 },
      { lat: 1.3185741, lng:	103.8417838 },  
      { lat: 1.288206, lng:	103.632556 },
      { lat: 1.3501318239332893, lng:	103.71912693279052 }, // changed (60)
      { lat: 1.433857, lng:	103.745885 }, 
      { lat: 1.405864, lng:	103.759312 },  
      { lat: 1.29610335, lng:	103.8536118 },
      { lat: 1.28921, lng:	103.633686 }, 	 	
      { lat: 1.28921, lng:	103.633686 },
      { lat: 1.2986701, lng:	103.6264781 }, 
      { lat: 1.3501318239332893, lng:	103.71912693279052 }, // changed (67)
      { lat: 1.38654, lng:	103.826742 }, 
      { lat: 1.324684127087285, lng:	103.72970139517851 }, // changed (69)
      { lat: 1.30391085, lng:	103.6980708 }, 
      { lat: 1.30391085, lng:	103.6980708 },
      { lat: 1.326472, lng:	103.705404 },
      { lat: 1.347521425262195, lng:	103.69284288601672 }, // changed (73)
      { lat: 1.31873665, lng:	103.6462746 },
      { lat: 1.3005082, lng: 103.8519219 },
      { lat: 1.32614795, lng:	103.6901966 },
      { lat: 1.343112, lng:	103.696774 },
      { lat: 1.3265222, lng:	103.8756586 },
      { lat: 1.3363322, lng:	103.7571071 },
      { lat: 1.3770475, lng:	103.7458118 },
      { lat: 1.3254864, lng:	103.8964589 },
      { lat: 1.37232, lng:	103.926466 },
      { lat: 1.3224061943399228, lng:	103.730870274626 }, // changed (83)
      { lat: 1.347852, lng:	103.716392 },
      { lat: 1.3384969237094257, lng:	103.69648397955329 }, // changed (85)
      { lat: 1.3203755, lng:	103.9450964 },
      { lat: 1.449009, lng:	103.793273 },
      { lat: 1.3106628, lng:	103.853747 },
      { lat: 1.3406699125787485, lng:	103.85825414229271 }, // changed (89)
      { lat: 1.456499, lng:	103.798259 },
      { lat: 1.297354, lng:	103.666895 },
      { lat: 1.3395165, lng:	103.7654921 },
      { lat: 1.287798, lng:	103.819545 },
      { lat: 1.375474, lng:	103.876178 },
      { lat: 1.28986075, lng:	103.845552 },
      { lat: 1.354951, lng:	103.7515577 },
      { lat: 1.46649535, lng:	103.8124676 },
      { lat: 1.293616, lng:	103.632411 },
      { lat: 1.381411, lng:	103.945329 },
      { lat: 1.3421584, lng:	103.7544337 },
      { lat: 1.37794625, lng:	103.8688826 },
      { lat: 1.322407, lng:	103.6502004 },
      { lat: 1.372691, lng:	103.8539085 },
      { lat: 1.381411, lng:	103.945329 },
      { lat: 1.335899, lng:	103.772762 },
      { lat: 1.4625085834451788, lng:	103.81252918910275 }, // changed (106)
      { lat: 1.3253881, lng:	103.6954326 },
      { lat: 1.3447474, lng:	103.7170635 },
      { lat: 1.3207142, lng:	103.6934362 },
      { lat: 1.33780305, lng:	103.9488712 }, // changed (110)
      { lat: 1.3808909, lng:	103.8977503 },
      { lat: 1.43905375, lng:	103.8281462 },
      { lat: 1.375474, lng:	103.876178 },
      { lat: 1.3370463, lng:	103.7550256 },
      { lat: 1.3133423, lng:	103.7514793 },
      { lat: 1.360334, lng:	103.875718 },
      { lat: 1.345072, lng:	103.884617 },
      { lat: 1.335475, lng:	103.8842269 },
      { lat: 1.28518765, lng:	103.810878 }, // (119)
      
      { lat: 1.28518765, lng:	103.810878 },
      { lat: 1.336003, lng:	103.893654 },
      { lat: 1.3236818, lng:	103.8748717 },
      { lat: 1.345072, lng:	103.884617 },
      { lat: 1.316188, lng:	103.721147 },
      { lat: 1.33091985, lng:	103.8924982 },
      { lat: 1.31905305, lng:	103.6416211 },
      { lat: 1.316899, lng:	103.734786 },
      { lat: 1.4546127503113258, lng:	103.80921986803358 },// changed(128)
      { lat: 1.4203806, lng:	103.7409711 },
      { lat: 1.3256103, lng:	103.8955825 },
      { lat: 1.3158341, lng:	103.8806847 },
      { lat: 1.340278, lng:	103.693509 },
      { lat: 1.3176074, lng:	103.6461203 },
      { lat: 1.431858, lng:	103.750364 },
      { lat: 1.35227065, lng:	103.8423326 },
      { lat: 1.357504, lng:	103.897112 },
      { lat: 1.3288865, lng:	103.8748403 },
      { lat: 1.32297045, lng:	103.6559849 },
      { lat: 1.33780305, lng:	103.9488712 },
      { lat: 1.42739965, lng:	103.8262934 },
      { lat: 1.330352, lng:	103.688991 },
      { lat: 1.38654, lng:	103.826742 },
      { lat: 1.285189864411628, lng:	 103.81164100684308 },  // changed (143)
      { lat: 1.325859, lng:	103.669309 },
      { lat: 1.3080855, lng:	103.765693 },
      { lat: 1.314545, lng:	103.693895 },
      { lat: 1.4350658, lng:	103.8420526 },
      { lat: 1.32478955, lng:	103.8947708 },
      { lat: 1.2924028, lng:	103.8511012 },
      { lat: 1.411241, lng:	103.752076 },
      { lat: 1.33850485, lng:	103.6918242 },
      { lat: 1.3146325, lng:	103.8774308 },
      { lat: 1.387273, lng:	103.830165 },
      { lat: 1.443588, lng:	103.808411 },
      { lat: 1.312885, lng:	103.729184 },
      { lat: 1.44277615, lng:	103.7928182 },
      { lat: 1.342904973557063, lng:	103.75242756305823 }, // changed (157)
      { lat: 1.37232, lng:	103.926466 },
      { lat: 1.37913, lng:	103.941102 },
      { lat: 1.3524941064349283, lng:	103.70287619878152 }, // changed (160)
      { lat: 1.3501318239332893, lng:	103.71912693279052 }, // changed (161)
      { lat: 1.43829685, lng:	103.8006662 },
      { lat: 1.376544, lng:	103.767706 },
      { lat: 1.325258, lng:	103.694699 },
      { lat: 1.336675, lng:	103.738082 },
      { lat: 1.3977235635918912, lng:	103.89923211092888 }, // changed (166)
      { lat: 1.316306, lng:	103.732887 },
      { lat: 1.3215035, lng:	103.7340709 },
      { lat: 1.3304748, lng:	103.7040934 },
      { lat: 1.30699854999999, lng: 103.6272116 },
      { lat: 1.3147236, lng:	103.8783194 },
      { lat: 1.337034, lng:	103.90865 },
      { lat: 1.3354664, lng:	103.9461584 },
      { lat: 1.3388398, lng:	103.7599384 },
      { lat: 1.342335, lng:	103.885811 },
      { lat: 1.32979625, lng:	103.8738411 },
      { lat: 1.3101169, lng:	103.6277823 },
      { lat: 1.2801192, lng:	103.8228262 },
      { lat: 1.425233, lng:	103.750032 },
      { lat: 1.3744207116723282, lng:	103.86010049163168 }, // changed (180)
      { lat: 1.3258012, lng:	103.8950548 },
      { lat: 1.28497185, lng:	103.8464325 },
      { lat: 1.3874829, lng:	103.765439 },
      { lat: 1.300477, lng:	103.747543 },
      { lat: 1.429825, lng:	103.780706 }, 
      { lat: 1.3201564566231905, lng:	103.73993754821784 }, // changed (186)
      { lat: 1.380032835823336, lng:	103.89042779880836 }, // changed (187)
      { lat: 1.341769409568757, lng:	103.68685935639505 }, // changed (188)
      { lat: 1.305103, lng:	103.86087 },
      { lat: 1.451456, lng:	103.816959 },
      { lat: 1.3334357338351337, lng:	103.91225687951582 }, // changed (191)
      { lat: 1.3223841, lng:	103.7408304 },
      { lat: 1.355352, lng:	103.896308 },
      { lat: 1.40563225, lng:	103.7525681 },
      { lat: 1.3061196, lng:	103.6996495 },
      { lat: 1.348071, lng:	103.733808 },
      { lat: 1.3749201, lng:	103.9369569 },
      { lat: 1.342359, lng:	103.7764335 },
      { lat: 1.3785181133762614, lng:	103.83936144451997 }, // changed (199)
      { lat: 1.3278483, lng:	103.6474146 },
      { lat: 1.3228693, lng:	103.9116858 },
      { lat: 1.338831, lng:	103.899029 },
      { lat: 1.3319936, lng:	103.8919347 },
      { lat: 1.443588, lng:	103.808411 },
      { lat: 1.3886189026529536, lng:	103.88925599969848 }, // changed (205)
      { lat: 1.337573, lng:	103.7569149 },
      { lat: 1.3364215, lng:	103.755651 },
      { lat: 1.326215, lng:	103.681337 },
      { lat: 1.316543, lng:	103.946946 },
      { lat: 1.381411, lng:	103.945329 },
      { lat: 1.426825, lng:	103.750474 },
      { lat: 1.3090566, lng:	103.8615164 },
      { lat: 1.322937, lng:	103.895112 },
      { lat: 1.322937, lng:	103.895112 },
      { lat: 1.438774, lng:	103.841217 },
      { lat: 1.3306947, lng:	103.9068329 },
      { lat: 1.319396, lng:	103.668837 },
      { lat: 1.33742255, lng:	103.8829416 },
      { lat: 1.3369243, lng:	103.7596555 },
      { lat: 1.2857109, lng:	103.8091224 }, // (220)
      { lat: 1.2751526, lng:	103.8463049 },
      { lat: 1.32521105, lng:	103.6954379 },
      { lat: 1.3329772, lng:	103.8839216 },
      { lat: 1.3433183, lng:	103.8835973 },
      { lat: 1.2857109, lng:	103.8091224 },
      { lat: 1.3137858, lng:	103.8553032 },
      { lat: 1.334223, lng:	103.939854 },
      { lat: 1.3791634, lng:	103.9764508 },
      { lat: 1.359933, lng:	103.896089 },
      { lat: 1.3517583, lng:	103.9338696 },
      { lat: 1.2936939, lng:	103.8495703 },
      { lat: 1.285686, lng:	103.807611 },
      { lat: 1.3421584, lng:	103.7544337 },
      { lat: 1.35353515, lng:	103.6977042 },
      { lat: 1.348073, lng:	103.955751 },
      { lat: 1.377842, lng:	103.875726 },
      { lat: 1.278371, lng:	103.7893411 },
      { lat: 1.32529075, lng:	103.8981633 },
      { lat: 1.312794, lng:	103.860635 },
      { lat: 1.38460995, lng:	103.7702644 },
      { lat: 1.2978109, lng:	103.8551261 },
      { lat: 1.437752, lng:	103.743522 },
      { lat: 1.3443017, lng:	103.8864975 },
      { lat: 1.3005082, lng:	103.8519219 },
      { lat: 1.32642705, lng:	103.6369781 },
      { lat: 1.3363322, lng:	103.7571071 },
      { lat: 1.438774, lng:	103.841217 },
      { lat: 1.38693, lng:	103.763952 },
      { lat: 1.322054, lng:	103.729557 },
      { lat: 1.377054, lng:	103.871024 },
      { lat: 1.282296, lng:	103.830436 },
      { lat: 1.28986075, lng:	103.845552 },
      { lat: 1.31351, lng:	103.885334 },
      { lat: 1.3369243, lng:	103.7596555 },
      { lat: 1.32529075, lng:	103.8981633 },
      { lat: 1.302641, lng:	103.883177 },
      { lat: 1.341189, lng:	103.894452 },
      { lat: 1.2924028, lng:	103.8511012 },
      { lat: 1.3744207116723282, lng:	103.86010049163168 }, // changed (259)
      { lat: 1.3364215, lng:	103.755651 },
      { lat: 1.3470666, lng:	103.9631737 },
      { lat: 1.3354664, lng:	103.9461584 },
      { lat: 1.3727993335381694, lng:	103.8897398232927 }, // changed (263)
      { lat: 1.348582, lng:	103.893045 },
      { lat: 1.416872, lng:	103.847005 },
      { lat: 1.346755, lng:	103.716198 },
      { lat: 1.418087, lng:	103.835354 },
      { lat: 1.3223841, lng:	103.7408304 },
      { lat: 1.4625085834451788, lng:	103.81252918910275 }, // changed (269) 
      { lat: 1.3337287, lng:	103.7151065 }, // (270)
      { lat: 1.43156, lng:	103.748581 },
      { lat: 1.348421, lng:	103.716233 },
      { lat: 1.3173353, lng:	103.6521976 },
      { lat: 1.352575, lng:	103.71937 },
      { lat: 1.3507808, lng:	103.7386101 },
      { lat: 1.36095645, lng:	103.8843909 },
      { lat: 1.3967367, lng:	103.7466996 },
      { lat: 1.320217, lng:	103.683032 },
      { lat: 1.3370627492829004, lng:	103.90526268835872 }, // changed (279)
      { lat: 1.339342, lng:	103.705996 },
      { lat: 1.400144, lng:	103.755101 }, //(281)
      { lat: 1.33888035, lng:	103.8919361 },
      { lat: 1.332311, lng:	103.948391 },
      { lat: 1.30188545, lng:	103.864019 },
      { lat: 1.316669, lng:	103.902214 },
      { lat: 1.33794, lng:	103.911413 },
      { lat: 1.350357, lng:	103.717846 },
      { lat: 1.3308549024741332, lng:	103.8874962159453 }, // changed (288)
      { lat: 1.35050445, lng:	103.8761935 },
      { lat: 1.35227065, lng:	103.8423326 },
      { lat: 1.415372, lng:	103.745483 },
      { lat: 1.337675, lng:	103.910867 },
      { lat: 1.316604, lng:	103.6687725 },
      { lat: 1.3754774, lng:	103.7626502 },
      { lat: 1.414148, lng:	103.7441267 },
      { lat: 1.3754774, lng:	103.7626502 },
      { lat: 1.3354664, lng:	103.9461584 },
      { lat: 1.30391085, lng:	103.6980708 },
      { lat: 1.34027055, lng:	103.9578757 },
      { lat: 1.3300834, lng:	103.646013 },
      { lat: 1.3343965, lng:	103.6458162 },
      { lat: 1.3750765, lng:	103.9712252 },
      { lat: 1.292277, lng:	103.850785 },
      { lat: 1.433313, lng:	103.751268 },
      { lat: 1.3369243, lng:	103.7596555 },
      { lat: 1.337646, lng:	103.754683 },
      { lat: 1.337573, lng:	103.7569149 },
      { lat: 1.434383, lng:	103.745496 },
      { lat: 1.4454093, lng:	103.7733703 }, // changed (309)
      { lat: 1.32868635, lng:	103.6958483 },
      { lat: 1.3005082, lng:	103.8519219 },
      { lat: 1.4414682057760893, lng:	103.78665778705144 }, // changed (312)
      { lat: 1.45257, lng:	103.798103 },
      { lat: 1.45191, lng: 103.7957706 },
    ]

    const companies = data.map((c, index) => ( 
        c.company_name
    )); 

    // console.log("com", companies);

    for (let i = 0; i < locations.length; i++) {
        locations[i].company = companies[i]; // Add company attribute
    }

    // console.log("locationsdata", locations);
    // console.log("locations", locations.length);
    
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

        const regionFromPostalCode = getRegionFromPostalCode(item.company_address);
        if (regionFromPostalCode) {
            return regionFromPostalCode === selectedRegion;
        }

        return false;
    };
      
    
    const filteredData = data.filter(item => filterByRegion(item));
    // console.log("ORI FILTER", filteredData.length);
    // console.log("ORI data", data.length);


    
    // if locations are at the same place appear in one pop-up
    const groupedMarkers = {};
    filteredData.forEach((record) => {
      const location = locations.find(loc => loc.company === record.company_name);
      if (location) {
          const key = `${location.lat},${location.lng}`; 
          if (!groupedMarkers[key]) {
              groupedMarkers[key] = {
                  position: [location.lat, location.lng],
                  companies: [] 
                };
            }
          groupedMarkers[key].companies.push(record); // add the company to the array for this location
        }
    });

    const markerData = Object.values(groupedMarkers).map(marker => ({
      position: marker.position,
      popupText: marker.companies.map(company => `
          <strong>${company.company_name || "Unknown Company"}</strong><br />
          <em className="mb-4">${company.company_address || "No address available"}</em>
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