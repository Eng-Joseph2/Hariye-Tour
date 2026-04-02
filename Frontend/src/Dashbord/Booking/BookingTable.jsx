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
} from "lucide-react";
import axios from "axios";

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:9005/api/readBooking");
      setBookings(res.data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusUpdate = async (id, newStatus, userEmail) => {
    if (
      window.confirm(
        `Ma hubtaa inaad ${newStatus === "allowed" ? "ogolaato" : "diido"}?`,
      )
    ) {
      setActionLoading(id);
      try {
        const response = await axios.put(
          `http://localhost:9005/api/updateBookingStatus/${id}`,
          { status: newStatus },
        );
        if (response.data.success) {
          alert("Guul! Email-ka waa la diray.");
          fetchBookings();
        }
      } catch (err) {
        alert("Cillad: Hubi Gmail Test User ama OAuth Settings.");
      } finally {
        setActionLoading(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      <div className="w-[18%] bg-[#0f172a] h-screen sticky top-0 shadow-xl z-20">
        <Menu />
      </div>
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <AdminAvatar />
        <div className="p-10">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-8">
            <UserCheck className="text-emerald-600" /> Booking Requests
          </h1>
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase text-center">
                    B.No
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">
                    Full Name
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">
                    Gmail Address
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
                    <td className="p-4 text-sm text-slate-600 flex items-center gap-2">
                      <Mail size={14} />
                      {booking.email}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full border ${booking.status === "allowed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        {booking.status?.toUpperCase() || "PENDING"}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      {actionLoading === booking._id ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                booking._id,
                                "allowed",
                                booking.email,
                              )
                            }
                            className="px-3 py-2 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                booking._id,
                                "rejected",
                                booking.email,
                              )
                            }
                            className="px-3 py-2 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition-all"
                          >
                            Reject
                          </button>
                        </>
                      )}
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
