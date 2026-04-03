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
      .get("http://localhost:9005/api/readAllTour")
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
    <section className="bg-gray-100 pb-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 pt-10">
        Popular Tours
      </h2>

      <div className="max-w-[80%] mx-auto grid md:grid-cols-3 gap-6">
        {data &&
          // 3. Use .slice() to limit the array based on visibleCount
          data.slice(0, visibleCount).map((tour) => (
            <Link to={`/tours/${tour._id}`} key={tour._id}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer group">
                <div className="relative overflow-hidden">
                  <img
                    src={`http://localhost:9005/images/${tour.image}`}
                    alt={tour.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-white text-sm px-3 py-1 rounded-full shadow font-bold">
                    ${tour.price}/person
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{tour.title}</h3>
                  <div className="flex justify-between px-4">
                    <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
                      <FaMapMarkerAlt className="mr-2" />
                      {tour.country}
                    </div>
                    <span className="text-green-500">{tour.status}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      {tour.Duration || 1} Days
                    </span>
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full capitalize">
                      {tour.category}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* 4. "View All" Button - Only shows if there are more than 6 tours and not all are visible */}
      {data.length > 6 && visibleCount < data.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={showAll}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300 shadow-md"
          >
            View All Tours
          </button>
        </div>
      )}
    </section>
  );
}
