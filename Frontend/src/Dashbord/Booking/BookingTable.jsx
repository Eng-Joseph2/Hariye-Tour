import React, { useEffect, useState, useCallback } from "react";
import Menu from "../Menu";
import AdminAvatar from "../AdminAvatar";
import {
  CheckCircle,
  XCircle,
  Mail,
  Info,
  UserCheck,
  Loader2,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // 1. Function-ka xogta keenaya (wuxuu sameynayaa reverse)
  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:9005/api/readBooking");
      const reversedData = (res.data.data || []).reverse();
      setBookings(reversedData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. useEffect leh Automatic Refresh (Interval)
  useEffect(() => {
    // Marka ugu horeysa keen xogta
    fetchBookings();

    // 5-tii ilbiriqsi kasta xogta soo cusboonaysii si toos ah
    const autoRefresh = setInterval(() => {
      fetchBookings();
    }, 5000);

    // Nadiifi interval-ka marka laga baxo bogga
    return () => clearInterval(autoRefresh);
  }, [fetchBookings]);

  const handleStatusUpdate = async (id, newStatus) => {
    const actionText = newStatus === "allowed" ? "confirm" : "reject";
    if (
      window.confirm(`Are you sure you want to ${actionText} this booking?`)
    ) {
      setActionLoading(id);
      try {
        const response = await axios.put(
          `http://localhost:9005/api/updateBookingStatus/${id}`,
          { status: newStatus },
        );
        if (response.data.success) {
          alert("Success! Status updated and notification email sent.");
          fetchBookings();
        }
      } catch (err) {
        alert("Error: Could not update status.");
        console.log(err);
      } finally {
        setActionLoading(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      <div className="w-[18%] bg-[#0f172a] h-screen sticky top-0 shadow-xl z-20">
        <Menu />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <AdminAvatar />

        <div className="p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <UserCheck className="text-emerald-600" /> Booking Requests
            </h1>
            <div className="flex gap-2 text-slate-400 text-sm italic">
              <Info size={16} /> Update status to automatically notify users.
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase text-center">
                    No.
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">
                    Full Name
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">
                    Email Address
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase text-center">
                    Status
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 text-sm text-center">{index + 1}</td>
                    <td className="p-4 font-semibold text-xs uppercase">
                      {booking.full_name}
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        {booking.email}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full border flex items-center justify-center gap-1 w-24 mx-auto ${
                          booking.status === "allowed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : booking.status === "rejected"
                              ? "bg-rose-50 text-rose-700 border-rose-100"
                              : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        {booking.status?.toUpperCase() || "PENDING"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        {actionLoading === booking._id ? (
                          <Loader2
                            className="animate-spin text-slate-400"
                            size={20}
                          />
                        ) : (
                          <>
                            {booking.status === "allowed" ||
                            booking.status === "rejected" ? (
                              <button
                                onClick={() => {
                                  const nextStatus =
                                    booking.status === "allowed"
                                      ? "rejected"
                                      : "allowed";
                                  handleStatusUpdate(booking._id, nextStatus);
                                }}
                                className="flex items-center gap-1 px-4 py-2 border border-blue-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                              >
                                <RefreshCw size={14} /> Update
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(booking._id, "allowed")
                                  }
                                  className="flex items-center gap-1 px-3 py-2 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all"
                                >
                                  <CheckCircle size={14} /> Confirm
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(booking._id, "rejected")
                                  }
                                  className="flex items-center gap-1 px-3 py-2 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition-all"
                                >
                                  <XCircle size={14} /> Reject
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingTable;
