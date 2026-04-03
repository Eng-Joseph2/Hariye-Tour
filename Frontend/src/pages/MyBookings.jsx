import React, { useState, useEffect, useCallback } from "react";

import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchMyBookings = useCallback(async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const userEmail = loggedInUser?.email;

    if (!userEmail) {
      console.error("No user email found. Please log in.");

      setLoading(false);

      return;
    }

    try {
      const res = await axios.get("http://localhost:9005/api/readBooking");

      // 3. Filter the global list of bookings to only show this user's email

      const myData = res.data.data.filter((b) => b.email === userEmail);

      console.log("My Filtered Bookings:", myData); // Debugging line

      setBookings(myData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  // 2. Handle Deletion via API

  const removeBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`http://localhost:9005/api/deleteBooking/${id}`);

        setBookings(bookings.filter((item) => item._id !== id));
      } catch (error) {
        alert("Failed to delete booking", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans mt-18">
      {/* Header Section */}

      <div className="bg-gradient-to-r from-green-700 to-blue-600 h-[25vh] flex flex-col justify-center text-white">
        <div className="w-[80%] mx-auto">
          <h1 className="text-4xl font-bold mb-4">My Bookings</h1>

          <p className="text-lg opacity-90">
            Manage your tours and view confirmed tickets
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-10 pb-20">
        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center"
              >
                {/* Image */}

                <div className="w-full md:w-[280px] h-[200px] overflow-hidden">
                  <img
                    src={`http://localhost:9005/images/${item.tourId?.image}`}
                    className="w-full h-full object-cover"
                    alt={item.tourId?.title}
                  />
                </div>

                <div className="flex-1 p-6 w-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {item.tourId?.title}
                      </h3>

                      <div className="space-y-2 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt size={12} />

                          <span>
                            {item.tourId?.city}, {item.tourId?.country}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaCalendarAlt size={12} />

                          <span>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-6">
                      <span
                        className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                          item.status === "allowed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.status === "allowed"
                          ? "Confirmed"
                          : "Pending Payment"}
                      </span>

                      <span className="text-xl font-bold text-slate-800">
                        ${item.tourId?.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-3">
                      {item.status === "allowed" ? (
                        <button
                          onClick={() =>
                            navigate(`/ticket/${item.tourId?._id}`)
                          }
                          className="flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#059669] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition shadow-sm hover:brightness-110"
                        >
                          <FaTicketAlt /> View Ticket
                        </button>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-3 max-w-md">
                          <div className="bg-amber-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shrink-0">
                            !
                          </div>

                          <p className="text-[11px] text-amber-800 leading-tight">
                            <strong className="block mb-1">
                              Physical Payment Required
                            </strong>
                            Please visit the agency to pay. Your ticket will
                            unlock here after Admin confirms.
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeBooking(item._id)}
                      className="text-red-400 hover:text-red-600 p-2 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-20 rounded-2xl text-center shadow-sm border border-gray-100 text-gray-400">
              No tours found in your bookings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
