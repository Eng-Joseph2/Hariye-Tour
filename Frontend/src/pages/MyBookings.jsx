import React, { useState } from "react";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const MyBookings = () => {
  const navigate = useNavigate();

  // 1. Initial State: Ka soo aqri xogta localStorage
  const [bookings, setBookings] = useState(() => {
    const data = localStorage.getItem("allBookings");
    return data ? JSON.parse(data) : [];
  });

  // 2. Function-ka Tirtirista (Delete)
  const removeBooking = (id) => {
    // Ka saar liiska hadda muuqda
    const filtered = bookings.filter((item) => item.tourId !== id);
    setBookings(filtered);
    // Ku cusboonaysii localStorage
    localStorage.setItem("allBookings", JSON.stringify(filtered));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans mt-18">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-700 to-blue-600 h-[25vh] flex flex-col  justify-center text-white">

        <div className="w-[80%] mx-auto">
          <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
          <p className="text-lg opacity-90">
            Manage your tours and view tickets
          </p>
        </div>

      </div>

      {/* Bookings List Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-10 pb-20">
        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <div
                key={item.tourId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center"
              >
                {/* Image */}
                <div className="w-full md:w-[280px] h-[200px] overflow-hidden">
                  <img
                    src={`http://localhost:9005/images/${item.image}`}
                    className="w-full h-full object-cover"
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 w-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {item.title}
                      </h3>
                      <div className="space-y-2 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" size={12} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" size={12} />
                          <span>
                            {new Date(item.bookedAt).toLocaleDateString()} -
                            4/20/2026
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                      <span className="bg-[#E6F4F1] text-[#00A884] text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                        Upcoming
                      </span>
                      <span className="text-xl font-bold text-slate-800">
                        ${item.price}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: View, Details & Delete */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 bg-[#00A884] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#008F6F] transition shadow-sm">
                        <FaTicketAlt /> View Ticket
                      </button>
                      <button
                        onClick={() => navigate(`/tour/${item.tourId}`)}
                        className="px-5 py-2.5 rounded-lg text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                      >
                        Tour Details
                      </button>
                    </div>

                    {/* Delete Button (Trash Icon) */}
                    <button
                      onClick={() => removeBooking(item.tourId)}
                      className="flex items-center gap-2 text-red-400 hover:text-red-600 p-2 transition-colors rounded-lg hover:bg-red-50"
                      title="Remove Booking"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-20 rounded-2xl text-center shadow-sm border border-gray-100 text-gray-400 italic font-medium">
              No tours found in your bookings.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
