import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaRegClock,
  FaCalendarAlt,
  FaCheck,
} from "react-icons/fa";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9005/api/readSingleTour/${id}`)
        .then((res) => {
          setTour(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("API Error:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 font-sans text-slate-500">
        Loading tour details...
      </div>
    );

  if (!tour)
    return (
      <div className="text-center py-20 font-sans text-red-500">
        Tour not found or server error.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 pt-32">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition-colors font-medium"
        >
          <span className="mr-2">←</span> Back to Tours
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Image */}
          <div className="relative h-[400px]">
            <img
              src={
                tour.image
                  ? `http://localhost:9005/images/${tour.image}`
                  : "https://via.placeholder.com/800x400"
              }
              alt={tour.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400";
              }}
            />

            <div className="absolute top-6 right-6 bg-white px-5 py-2 rounded-full shadow-xl font-bold text-xl text-emerald-600">
              ${tour.price || 0}
              <span className="text-sm text-gray-400 font-normal ml-1">
                / person
              </span>
            </div>
          </div>

          <div className="p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="flex-1">
                <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
                  {tour.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-slate-500">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-500" />
                    {tour.location || tour.country}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaRegClock className="text-emerald-500" />
                    {tour.days || tour.duration} days
                  </span>

                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-emerald-500" />
                    {tour.status || "Available Now"}
                  </span>
                </div>
              </div>

              {/* ✅ BOOK BUTTON ADDED */}
              <button
                onClick={() => navigate(`/bookings`)}
                className="w-full md:w-auto bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                Book This Tour
              </button>
            </div>

            <hr className="border-slate-100 mb-10" />

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                About This Tour
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {tour.desc ||
                  tour.description ||
                  "No description provided for this tour."}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Tour Highlights
              </h3>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(tour.Highlights) &&
                tour.Highlights.length > 0 ? (
                  tour.Highlights.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100"
                    >
                      <div className="bg-emerald-100 p-1 rounded-full">
                        <FaCheck className="text-emerald-600 text-xs" />
                      </div>
                      {item}
                    </li>
                  ))
                ) : (
                  <p className="text-slate-400 italic text-sm">
                    Highlights will be updated soon.
                  </p>
                )}
              </ul>
            </div>

            {/* Info */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-emerald-800 mb-6">
                Important Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-700">
                <div>
                  <p className="text-xs font-bold uppercase text-emerald-600">
                    Min Age
                  </p>
                  <p className="font-medium">{tour.minAge || "12+"} years</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-emerald-600">
                    Group Size
                  </p>
                  <p className="font-medium">
                    {tour.maxGroup || tour.maxGuests || "15"} people
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-emerald-600">
                    Fitness Level
                  </p>
                  <p className="font-medium">
                    {tour.fitnessLevel || "Moderate"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-emerald-600">
                    Cancellation
                  </p>
                  <p className="font-medium">Free up to 7 days before</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
