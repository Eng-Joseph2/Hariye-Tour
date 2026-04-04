import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaUserCheck } from "react-icons/fa";

const VerifyTicket = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:9005/api/readBooking/${id}`);
        setBooking(res.data.data);
      } catch (err) {
        setMessage("Invalid Ticket ID");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleConfirmUse = async () => {
    try {
      const res = await axios.put(`http://localhost:9005/api/verify-ticket/${id}`);
      setMessage(res.data.message);
      setBooking({ ...booking, status: "used" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying ticket");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Security Protocol...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
        <h1 className="text-xl font-bold mb-6 text-center text-slate-800">Admin Verification</h1>

        {booking && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-xs text-slate-400 uppercase font-mono">Traveler Name</p>
              <p className="text-lg font-bold text-slate-900">{booking.full_name}</p>
            </div>

            <div className={`p-4 rounded-xl border text-center ${
              booking.status === 'used' ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <p className="text-xs text-slate-500 uppercase">Current Status</p>
              <p className={`text-xl font-black ${booking.status === 'used' ? 'text-red-600' : 'text-emerald-600'}`}>
                {booking.status.toUpperCase()}
              </p>
            </div>

            {booking.status === "allowed" ? (
              <button
                onClick={handleConfirmUse}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg"
              >
                <FaUserCheck /> CONFIRM ENTRY (MARK USED)
              </button>
            ) : (
              <div className="text-center py-4 text-red-500 font-bold flex flex-col items-center gap-2">
                <FaTimesCircle size={40} />
                ACCESS DENIED: TICKET VOID
              </div>
            )}
          </div>
        )}

        {message && (
          <div className="mt-6 p-3 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyTicket;