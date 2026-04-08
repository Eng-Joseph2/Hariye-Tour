import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminAvatar from "./AdminAvatar";
import { CheckCircle, Mail, Loader2, Info, Eye, X } from "lucide-react";
import axios from "axios";

function AcceptedBookingsTable() {
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchAcceptedBookings = async () => {
    try {
      const res = await axios.get("https://hariye-tour-agency.onrender.com/api/readBooking");
      const allBookings = res.data.data || [];
      const accepted = allBookings.filter((booking) => booking.status === "allowed");
      setAcceptedBookings(accepted);
    } catch (error) {
      console.error("Error fetching accepted bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-slate-50 overflow-hidden">
        <div className="w-[18%] bg-[#0f172a] h-screen sticky top-0 shadow-xl z-20">
          <Menu />
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <AdminAvatar />
          <div className="p-10">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <CheckCircle className="text-emerald-600" /> Accepted Bookings
            </h1>
            <div className="flex gap-2 text-slate-400 text-sm italic">
              <Info size={16} /> Showing all bookings with status allowed.
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
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
                  {acceptedBookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-500">
                        No accepted bookings yet
                      </td>
                    </tr>
                  ) : (
                    acceptedBookings.map((booking, index) => (
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
                          <span className="text-[10px] font-black px-3 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100 flex items-center justify-center gap-1 w-24 mx-auto">
                            <CheckCircle size={12} />
                            ACCEPTED
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="flex items-center gap-1 mx-auto px-3 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-white transition-all"
                          >
                            <Eye size={14} /> Tour Info
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Tour Info</h2>
                <p className="text-sm text-slate-500">Details for the selected accepted booking.</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-500 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[.2em] mb-2">Tour Name</p>
                  <p className="text-slate-800 font-semibold">{selectedBooking.tourId?.title || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[.2em] mb-2">Price</p>
                  <p className="text-slate-800 font-semibold">${selectedBooking.tourId?.price || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[.2em] mb-2">Location</p>
                  <p className="text-slate-800 font-semibold">{selectedBooking.tourId?.city}, {selectedBooking.tourId?.country}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[.2em] mb-2">Duration</p>
                  <p className="text-slate-800 font-semibold">{selectedBooking.tourId?.duration || "N/A"}</p>
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-[.2em] mb-2">Tour Description</p>
                <p className="text-slate-700 text-sm leading-relaxed">{selectedBooking.tourId?.description || "No description available."}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[.2em] mb-2">Start Day</p>
                  <p className="text-slate-800 font-semibold">{selectedBooking.tourId?.startDay ? new Date(selectedBooking.tourId.startDay).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-[.2em] mb-2">Booking Status</p>
                  <p className="text-slate-800 font-semibold">{selectedBooking.status?.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AcceptedBookingsTable;