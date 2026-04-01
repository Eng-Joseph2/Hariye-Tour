import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ka soo aqri xogta Backend-kaaga
    axios
      .get("http://localhost:9005/api/readAllBookings")
      .then((res) => {
        setBookings(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading Bookings...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header-ka Gradient-ka ah (Sida sawirka) */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-blue-700 py-24 px-6 md:px-20 text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="opacity-90 text-lg">
            Manage your tours and view tickets
          </p>
        </div>
      </div>

      {/* Liiska Bookings-ka */}
      <div className="max-w-5xl mx-auto p-6 -mt-12">
        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
              >
                {/* Sawirka Tour-ka */}
                <div className="md:w-72 h-48 md:h-auto overflow-hidden">
                  <img
                    src={`http://localhost:9005/images/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Macluumaadka Tour-ka */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-slate-800">
                        {item.title}
                      </h3>
                      <span className="bg-emerald-50 text-emerald-600 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
                        {item.status || "Upcoming"}
                      </span>
                    </div>

                    <div className="space-y-3 text-slate-500 text-sm">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-emerald-500" />{" "}
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-emerald-500" />{" "}
                        {item.bookingDate || "4/15/2026 - 4/20/2026"}
                      </div>
                    </div>
                  </div>

                  {/* Badammada Hoose */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-sm">
                        <FaTicketAlt /> View Ticket
                      </button>
                      <button className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                        Tour Details
                      </button>
                    </div>
                    <div className="text-2xl font-black text-slate-800">
                      ${item.price}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-20 rounded-3xl text-center shadow-sm border border-gray-100">
              <p className="text-gray-500 italic">
                No bookings found. Start exploring tours!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
