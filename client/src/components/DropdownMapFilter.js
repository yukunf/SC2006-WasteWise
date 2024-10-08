import React from "react";

const DropdownMapFilter = ({ selectedRegion, setSelectedRegion }) => {
    const regions = ["Central", "East", "West", "North", "North-East"];
    return (
            <div className="flex flex-col mb-4">
                <label className="block mb-2 font-bold text-[#016a70] text-[32px] font-poppins text-left mt-2">Select Region:</label>
                <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-gray-300 rounded-lg shadow-2xl px-3 py-2 text-black w-[300px]"
                >
                <option value="" className="text-black">All Regions</option>
                {regions.map((region) => (
                    <option key={region} value={region}>
                    {region}
                    </option>
                ))}
                </select>
            </div>
        );
};

export default DropdownMapFilter;