import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PopularTours() {
  const [data, setData] = useState([]);
  // 1. Add state to track how many items to show
  const [visibleCount, setVisibleCount] = useState(6);

  const HandalReadTour = () => {
    axios
      .get("https://hariye-tour-agency-u7bh.onrender.com/api/readAllTour")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    HandalReadTour();
  }, []);

  // 2. Logic to toggle between 6 and all items
  const showAll = () => {
    setVisibleCount(data.length);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Popular Tours
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Discover the best experiences curated just for you
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-[80%] mx-auto grid md:grid-cols-3 gap-8">
        {data &&
          data.slice(0, visibleCount).map((tour) => (
            <Link to={`/tours/${tour._id}`} key={tour._id}>
              <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/70 backdrop-blur-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 h-[350px]">

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://hariye-tour-agency-u7bh.onrender.com/images/${tour.image}`}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-sm font-semibold rounded-full shadow">
                    ${tour.price}
                  </div>

                  {/* Title over image */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold leading-tight">
                      {tour.title}
                    </h3>
                    <div className="flex items-center text-sm opacity-90 mt-1">
                      <FaMapMarkerAlt className="mr-1" />
                      {tour.country}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Description */}
                  <p
                    className="text-gray-600 text-sm mb-3"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {tour.desc || "No description available"}
                  </p>

                  {/* Badges */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                      {tour.Duration || 1} Days
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 capitalize font-medium">
                      {tour.category}
                    </span>
                  </div>

                  {/* Status + CTA */}
                  <div className="flex justify-between items-center mt-auto">
                    <span
                      className={`text-sm font-medium ${tour.status === "Available"
                          ? "text-green-500"
                          : "text-red-500"
                        }`}
                    >
                      {tour.status}
                    </span>
                    <span className="text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* "View All Tours" Button */}
      {data.length > 6 && visibleCount < data.length && (
        <div className="flex justify-center mt-14">
          <button
            onClick={showAll}
            className="px-8 py-3 rounded-full font-semibold text-white 
          bg-gradient-to-r from-blue-600 to-indigo-600 
          hover:from-blue-700 hover:to-indigo-700 
          transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Tours
          </button>
        </div>
      )}
    </section>
  );
}
