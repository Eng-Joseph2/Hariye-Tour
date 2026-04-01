import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 py-16 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-500">
            <FaMapMarkerAlt size={24} />
            <h2 className="text-xl font-bold text-white tracking-tight">
              East Africa Tours
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Discover the beauty of East Africa with our curated tours and
            experiences. Explore nature, history, and culture with us.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Destinations</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-emerald-500 cursor-pointer transition">
              Somalia
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition">
              Kenya
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition">
              Ethiopia
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition">
              Tanzania
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-emerald-500 cursor-pointer transition">
              Browse Tours
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition">
              My Bookings
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition">
              Login
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-emerald-500" />
              <span>info@eastafricatours.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-emerald-500" />
              <span>+254 700 000 000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2026 East Africa Tours. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
