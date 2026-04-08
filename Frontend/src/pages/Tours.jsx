import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

import CustomSelect from "../components/ui/CustomSelect";

const Tours = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("All Countries");
  const [category, setCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("All Prices");
  const [level, setLevel] = useState("All Levels");

  // 1. Fetch the original data from the API only once
  useEffect(() => {
    axios
      .get("https://hariye-tour-agency.onrender.com/api/readAllTour")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 2. IMPORTANT: apply filtering here using a normal variable
  // This avoids unnecessary re-renders
  const filteredData = data.filter((tour) => {
    const matchCountry =
      country === "All Countries" || tour.country === country;
    const matchCategory =
      category === "All Categories" || tour.category === category;
    const matchLevel =
      level === "All Levels" || tour.level === level;

    let matchPrice = true;
    if (priceRange !== "All Prices") {
      const [min, max] = priceRange.split("-").map(Number);
      matchPrice = max
        ? tour.price >= min && tour.price <= max
        : tour.price >= min;
    }

    return matchCountry && matchCategory && matchLevel && matchPrice;
  });

  const resetFilters = () => {
    setCountry("All Countries");
    setCategory("All Categories");
    setPriceRange("All Prices");
    setLevel("All Levels");
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-18">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-700 to-blue-600 h-[25vh] flex flex-col  justify-center text-white">
        <div className="w-[80%] mx-auto">
          <h1 className="text-4xl font-bold mb-4">All Tours</h1>
          <p className="text-lg opacity-90">
            Discover {filteredData.length} amazing tours across East Africa
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-12">
        {/* HORIZONTAL FILTERS */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Country Select */}
            <div className="flex-1 min-w-[200px]">
              <CustomSelect
                label="Country"
                value={country}
                onChange={(val) => setCountry(val)}
                options={[
                  "All Countries",
                  "Somalia",
                  "Kenya",
                  "Tanzania",
                  "Ethiopia",
                  "Uganda",
                  "Rwanda",
                  "Djibouti",
                  "South Sudan",
                  "Eritrea",
                  "Burundi",
                ]}
              />
            </div>

            {/* Category Select */}
            <div className="flex-1 min-w-[200px]">
              <CustomSelect
                label="Category"
                value={category}
                onChange={(val) => setCategory(val)}
                options={[
                  "All Categories",
                  "Nature",
                  "Beaches",
                  "Forests",
                  "Farms",
                  "Historical",
                  "Restaurants",
                ]}
              />
            </div>

            {/* Price Select */}
            <div className="flex-1 min-w-[200px]">
              <CustomSelect
                label="Price Range"
                value={priceRange}
                onChange={(val) => setPriceRange(val)}
                options={[
                  "All Prices",
                  "$0 - $500",
                  "$501 - $1000",
                  "$1001 - $5000",
                ]}
              />
            </div>

            {/* Level Select */}
            <div className="flex-1 min-w-[200px]">
              <CustomSelect
                label="Level"
                value={level}
                onChange={(val) => setLevel(val)}
                options={[
                  "All Levels",
                  "premier",
                  "new",
                  "standard",
                ]}
              />
            </div>

            {/* Reset Button */}
            <div className="flex-shrink-0">
              <button
                onClick={resetFilters}
                className="w-full py-3 px-6 border-2 border-green-600/20 text-green-700 rounded-xl hover:bg-green-600 hover:text-white hover:border-green-600 active:scale-[0.98] transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 group-hover:rotate-[-45deg] transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* TOURS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((tour) => (
            <Link to={`/tours/${tour._id}`} key={tour._id}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative">
                  <img
                    src={`https://hariye-tour-agency.onrender.com/images/${tour.image}`}
                    alt={tour.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    ${tour.price}
                  </span>
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                    tour.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                    tour.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                    tour.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tour.status?.toUpperCase()}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 truncate">
                    {tour.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-gray-400" /> {tour.country}
                    </div>
                    <span className="font-semibold text-green-600">{tour.days} days</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {tour.desc?.split('\n').slice(0, 2).join(' ') || tour.desc?.substring(0, 120) + '...'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded-md">
                      {tour.category}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                      tour.level === 'premier' ? 'bg-purple-100 text-purple-800' :
                      tour.level === 'new' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {tour.level?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;
