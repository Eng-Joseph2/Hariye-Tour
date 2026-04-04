import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  FaUserCircle,
  FaTicketAlt,
  FaShieldAlt,
  FaSpinner,
} from "react-icons/fa";
import { LuPlaneLanding, LuPlaneTakeoff } from "react-icons/lu";
import axios from "axios";
const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `https://hariye-tour-agency.onrender.com/api/readBooking/${id}`,
        );
        setTicketData(res.data.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-emerald-600 font-mono">
        <FaSpinner className="animate-spin mb-4" size={40} />
        <p>_FETCHING_ENCRYPTED_PASS_</p>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4 font-mono font-bold">
          _ERROR: Ticket Not Found or Not Authorized_
        </p>
        <button
          onClick={() => navigate("/bookings")}
          className="text-emerald-600 underline font-mono text-sm"
        >
          &gt; back_to_dashboard
        </button>
      </div>
    );
  }

  const gate = ["A12", "B4", "C20", "C25"][Math.floor(Math.random() * 4)];
  const seat = `${10 + Math.floor(Math.random() * 20)}${["A", "C", "D", "F"][Math.floor(Math.random() * 4)]}`;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-0 font-sans antialiased text-slate-900">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-slate-400 hover:text-emerald-600 transition-colors font-mono text-xs tracking-wider no-print"
        >
          ← GO_BACK
        </button>

        {/* MODERN TICKET CONTAINER */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

          {/* HEADER SECTION */}
          <div className="p-8 pb-6 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-3">
              <FaTicketAlt className="text-3xl text-emerald-600" />
              <div>
                <h1 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  Boarding Pass
                </h1>
                <p className="text-lg font-bold text-slate-800">
                  Booking confirmed
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">
                TICKET ID
              </span>
              <p className="text-sm font-semibold text-emerald-600">
                #{ticketData._id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          {/* FLIGHT-LIKE DESTINATION DISPLAY */}
          <div className="bg-slate-50 p-6 flex items-center justify-between border-b border-gray-100">
            <div className="text-center flex-1">
              <LuPlaneTakeoff className="text-3xl text-emerald-600 mx-auto mb-1" />
              <p className="text-[11px] font-mono text-slate-400 tracking-wider">
                ORIGIN
              </p>
              <p className="text-lg font-bold text-slate-800">
                Mogadishu (MGQ)
              </p>
            </div>

            <div className="relative w-1/3 flex items-center justify-center">
              <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
              <FaShieldAlt className="absolute text-2xl text-slate-300 bg-slate-50 p-1" />
            </div>

            <div className="text-center flex-1">
              <LuPlaneLanding className="text-3xl text-teal-500 mx-auto mb-1" />
              <p className="text-[11px] font-mono text-slate-400 tracking-wider">
                DESTINATION
              </p>
              <p className="text-lg font-bold text-slate-800">
                {ticketData.tourId?.city || "Kismayo"} (
                {ticketData.tourId?.city?.slice(0, 3).toUpperCase() || "KIS"})
              </p>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="p-8 space-y-8">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                Tour Experience
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                {ticketData.tourId?.title}
              </p>
              <span className="inline-block mt-2 text-[10px] font-mono bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                Tier 1 Verified
              </span>
            </div>

            {/* Traveler Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-4xl text-slate-200" />
                <div>
                  <p className="text-[11px] font-mono text-slate-400">
                    Traveler
                  </p>
                  <p className="font-semibold text-slate-800">
                    {ticketData.fullname ||
                      ticketData.name ||
                      ticketData.full_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {ticketData.gender || "Guest"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-400">
                  Scheduled Date
                </p>
                <p className="font-semibold text-slate-800">
                  {new Date(ticketData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right col-span-2 md:col-span-1">
                <p className="text-[11px] font-mono text-slate-400">
                  Total Price
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ${ticketData.tourId?.price}
                </p>
              </div>
            </div>

            {/* Gate/Seat */}
            <div className="grid grid-cols-3 gap-6 bg-slate-50 p-4 rounded-xl text-center font-mono border border-gray-100">
              <div>
                <span className="text-[10px] text-slate-400">GATE</span>
                <p className="text-lg font-bold text-emerald-600">{gate}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">GROUP</span>
                <p className="text-lg font-bold text-slate-700">B</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">SEAT</span>
                <p className="text-lg font-bold text-slate-700">{seat}</p>
              </div>
            </div>
          </div>

          {/* QR CODE AREA */}
          <div className="p-8 pt-0 flex flex-col items-center">
            <div className="relative w-full text-center py-4">
              <div className="border-t border-dashed border-gray-200 w-full absolute top-1/2 left-0 -translate-y-1/2"></div>
              <span className="relative z-10 bg-white px-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Access Protocol
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
              <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                <QRCodeSVG
                  // Replace localhost:5173 with your actual deployed URL later
                  value={`http://localhost:5173/verify-ticket/${ticketData._id}`}
                  size={120}
                  fgColor="#1e293b"
                />
              </div>

              <div className="text-center md:text-left space-y-2">
                <p className="text-sm text-slate-600 max-w-sm">
                  Present this digital pass at the tour meeting point in{" "}
                  {ticketData.tourId?.city}. Valid only on the scheduled date.
                </p>
                <p className="text-xs font-mono text-emerald-600 font-bold">
                  Scan for entry and verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-12 grid grid-cols-2 gap-4 no-print">
          <button className="bg-white border border-gray-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all font-mono text-sm tracking-wider shadow-sm">
            Save to Device
          </button>
          <button
            onClick={() => window.print()}
            className="bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 font-mono text-sm tracking-wider"
          >
            Download PDF / Print
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .bg-gray-50, .bg-slate-50, .bg-white { background-color: white !important; }
            .border { border-color: #eee !important; }
            .shadow-xl, .shadow-lg, .shadow-sm { box-shadow: none !important; }
          }
        `,
        }}
      />
    </div>
  );
};

export default Ticket;
