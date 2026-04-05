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

    let matchPrice = true;
    if (priceRange !== "All Prices") {
      const [min, max] = priceRange.split("-").map(Number);
      matchPrice = max
        ? tour.price >= min && tour.price <= max
        : tour.price >= min;
    }

    return matchCountry && matchCategory && matchPrice;
  });

  const resetFilters = () => {
    setCountry("All Countries");
    setCategory("All Categories");
    setPriceRange("All Prices");
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

      <div className="max-w-[1400px] mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR - Filter Section */}
        <aside className="w-full md:w-1/4 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-fit sticky top-24 transition-all duration-300">
          <div className="flex flex-col gap-8">
            {/* Header (Optional but recommended) */}
            <div>
              <h3 className="text-lg font-bold text-slate-800">Filters</h3>
              <p className="text-xs text-slate-500">
                Refine your search results
              </p>
            </div>

            <div className="space-y-5">
              {/* Country Select */}
              <div className="group">
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
              <div className="group">
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
              <div className="group">
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
            </div>

            {/* Reset Action */}
            <button
              onClick={resetFilters}
              className="w-full py-3 px-4 border-2 border-green-600/20 text-green-700 rounded-xl hover:bg-green-600 hover:text-white hover:border-green-600 active:scale-[0.98] transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2 group"
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
              Reset Filters
            </button>
          </div>
        </aside>

        {/* TOURS GRID */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">
                    {tour.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <FaMapMarkerAlt className="mr-1" /> {tour.country}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded-md">
                      {tour.days} days
                    </span>
                    <span className="text-blue-500 text-xs font-medium bg-blue-50 px-2 py-1 rounded-md">
                      {tour.category}
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
