import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserCircle, FaTicketAlt, FaShieldAlt } from "react-icons/fa";
import { LuPlaneLanding, LuPlaneTakeoff } from "react-icons/lu";

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch data from localStorage
  const allBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
  const ticketData = allBookings.find((b) => b.tourId === id);

  if (!ticketData) {
    return (
      <div className="text-center py-20 bg-slate-950 min-h-screen">
        <p className="text-red-400 mb-4 font-mono">_ERROR: Ticket Not Found_</p>
        <button onClick={() => navigate("/bookings")} className="text-emerald-400 underline font-mono text-sm">
          &gt; back_to_dashboard
        </button>
      </div>
    );
  }

  // Generate a random "gate" and "seat" for that "pro" travel feel
  const gate = ['A12', 'B4', 'C20', 'C25'][Math.floor(Math.random() * 4)];
  const seat = `${10 + Math.floor(Math.random() * 20)}${['A', 'C', 'D', 'F'][Math.floor(Math.random() * 4)]}`;

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 md:px-0 font-sans antialiased text-slate-100">
      <div className="max-w-xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-slate-500 hover:text-emerald-400 transition-colors font-mono text-xs tracking-wider"
        >
          ← GO_BACK
        </button>

        {/* MODERN TICKET CONTAINER */}
        <div className="relative bg-slate-900 rounded-3xl shadow-[0_20px_60px_-15px_rgba(10,150,110,0.1)] overflow-hidden border border-slate-800">
          
          {/* PREMIUM TOP GRADIENT ACCENT */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400"></div>

          {/* HEADER SECTION */}
          <div className="p-8 pb-6 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-3">
              <FaTicketAlt className="text-3xl text-emerald-500" />
              <div>
                <h1 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Boarding Pass</h1>
                <p className="text-lg font-bold">Booking confirmed</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 block">TOUR ID</span>
              <p className="text-sm font-semibold text-emerald-300">#{ticketData.tourId.slice(-6).toUpperCase()}</p>
            </div>
          </div>

          {/* FLIGHT-LIKE DESTINATION DISPLAY */}
          <div className="bg-slate-800/50 p-6 flex items-center justify-between border-b border-slate-800">
            <div className="text-center flex-1">
              <LuPlaneTakeoff className="text-3xl text-emerald-600 mx-auto mb-1" />
              <p className="text-[11px] font-mono text-slate-500 tracking-wider">ORIGIN</p>
              <p className="text-lg font-bold">Mogadishu (MGQ)</p>
            </div>
            
            <div className="relative w-1/3 flex items-center justify-center">
              <div className="border-t-2 border-dashed border-slate-600 w-full"></div>
              <FaShieldAlt className="absolute text-2xl text-slate-700 bg-slate-900 p-1" />
            </div>

            <div className="text-center flex-1">
              <LuPlaneLanding className="text-3xl text-teal-400 mx-auto mb-1" />
              <p className="text-[11px] font-mono text-slate-500 tracking-wider">DESTINATION</p>
              <p className="text-lg font-bold">{ticketData.city || 'Kismayo'} (KIS)</p>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="p-8 space-y-8">
            
            {/* Tour Title & Status */}
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Tour Experience</p>
              <p className="text-2xl font-extrabold text-white">{ticketData.title}</p>
              <span className="inline-block mt-2 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/30">
                Tier 1 Verified
              </span>
            </div>

            {/* Traveler Details (New Modern Layout) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-4xl text-slate-700" />
                <div>
                  <p className="text-[11px] font-mono text-slate-500">Traveler</p>
                  <p className="font-semibold">{ticketData.name}</p>
                  <p className="text-xs text-slate-500">{ticketData.gender}, adult</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-500">Scheduled Date</p>
                <p className="font-semibold text-white">{new Date(ticketData.bookedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="text-right col-span-2 md:col-span-1">
                <p className="text-[11px] font-mono text-slate-500">Total Price</p>
                <p className="text-2xl font-black text-white">${ticketData.price}</p>
              </div>
            </div>

            {/* Fake Gate/Seat for added complexity */}
            <div className="grid grid-cols-3 gap-6 bg-black/30 p-4 rounded-xl text-center font-mono">
                <div>
                    <span className="text-[10px] text-slate-500">GATE</span>
                    <p className="text-lg font-bold text-emerald-400">{gate}</p>
                </div>
                <div>
                    <span className="text-[10px] text-slate-500">GROUP</span>
                    <p className="text-lg font-bold text-white">B</p>
                </div>
                <div>
                    <span className="text-[10px] text-slate-500">SEAT</span>
                    <p className="text-lg font-bold text-white">{seat}</p>
                </div>
            </div>

          </div>

          {/* QR CODE & VERIFICATION AREA (Integrated differently) */}
          <div className="p-8 pt-0 flex flex-col items-center">
            <div className="relative w-full text-center py-4">
                <div className="border-t border-dashed border-slate-800 w-full absolute top-1/2 left-0 -translate-y-1/2"></div>
                <span className="relative z-10 bg-slate-900 px-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">Access Protocol</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
                <div className="bg-white p-4 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <QRCodeSVG 
                    value={`TOUR:${ticketData.tourId}|USER:${ticketData.email}`} 
                    size={130}
                    fgColor="#020617" // Slate 950
                />
                </div>
                
                <div className="text-center md:text-left space-y-2">
                <p className="text-sm text-slate-300 max-w-sm">Present this digital pass at the tour meeting point or checkpoint. Valid only on the scheduled date.</p>
                <p className="text-xs font-mono text-emerald-400">Scan for entry and verification.</p>
                </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS (Updated styling) */}
        <div className="mt-12 grid grid-cols-2 gap-4 no-print">
            <button className="bg-slate-800 text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all font-mono text-sm tracking-wider">
                _Save to Device
            </button>
            <button 
                onClick={() => window.print()}
                className="bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-[0_5px_30px_rgba(10,150,110,0.3)] font-mono text-sm tracking-wider"
            >
                _Download PDF / Print
            </button>
        </div>
      </div>

      {/* Print CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white; color: black; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .bg-slate-950, .bg-slate-900, .bg-slate-800\/50, .bg-black\/30 { background-color: transparent !important; }
          .border { border-color: #ddd !important; }
          .text-slate-100, .text-slate-300, .text-white { color: black !important; }
          .text-slate-500 { color: #888 !important; }
          .text-emerald-400, .text-emerald-300 { color: #059669 !important; }
          .border-emerald-500\/30 { border-color: #059669 !important; }
          .shadow-\[0_20px_60px_-15px_rgba\(10\,150\,110\,0\.1\)\] { box-shadow: none !important; }
          .h-1 { display: none; }
        }
      `}} />
    </div>
  );
}

export default Ticket;