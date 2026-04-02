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

  // 1. Kaliya xogta asalka ah ka keen API-ga hal mar
  useEffect(() => {
    axios
      .get("http://localhost:9005/api/readAllTour")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 2. HALKAN WAAYE SIRTU: Sifeeynta halkan ku sameey adigoo isticmaalaya variable caadi ah
  // Tani ma kicinayso re-render aan loo baahnayn
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
        <div className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-sm border h-fit sticky top-24">
          <div className="space-y-6">

            {/* Country Select */}
            <CustomSelect
              label="Country"
              value={country}
              onChange={(val) => setCountry(val)}
              options={["All Countries", "Somalia", "Kenya", "Tanzania", "Ethiopia", "Uganda", "Rwanda", "Djibouti", "South Sudan", "Eritrea", "Burundi"]}
            />

            {/* Category Select */}
            <CustomSelect
              label="Category"
              value={category}
              onChange={(val) => setCategory(val)}
              options={["All Categories", "Nature", "Beaches", "Forests", "Farms", "Historical", "Restaurants"]}
            />

            {/* Price Select */}
            <CustomSelect
              label="Price Range"
              value={priceRange}
              onChange={(val) => setPriceRange(val)}
              /* Note: Use the display labels here. If your filtering logic 
                 needs the "0-500" format, see the tip below. */
              options={["All Prices", "$0 - $500", "$501 - $1000", "$1001 - $5000"]}
            />

            <button
              onClick={resetFilters}
              className="w-full py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* TOURS GRID */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((tour) => (
            <Link to={`/tours/${tour._id}`} key={tour._id}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative">
                  <img
                    src={`http://localhost:9005/images/${tour.image}`}
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
