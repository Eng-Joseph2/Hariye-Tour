import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 py-16">
      <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <path
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#22c55e] to-[#33c86a] bg-clip-text text-transparent">
              Hariye Tour Agency
            </span>
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
            <li className="hover:text-emerald-500 cursor-pointer transition">
              Other 5+ destinations
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/tours" className="hover:text-emerald-500 transition">
                Browse Tours
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="hover:text-emerald-500 transition">
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-emerald-500 transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center bg-gradient-to-r from-[#22c55e] to-[#059669] bg-clip-text text-transparent">
                <FaEnvelope className="w-4 h-4 fill-[#22c55e]" style={{ fill: 'url(#contact-gradient)' }} />
                <svg width="0" height="0" className="absolute">
                  <linearGradient id="contact-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#22c55e" offset="0%" />
                    <stop stopColor="#059669" offset="100%" />
                  </linearGradient>
                </svg>
              </span>
              <span className="text-gray-300">info@eastafricatours.com</span>
            </li>

            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center bg-gradient-to-r from-[#22c55e] to-[#059669] bg-clip-text text-transparent">
                <FaPhoneAlt className="w-4 h-4 fill-[#22c55e]" style={{ fill: 'url(#contact-gradient)' }} />
              </span>
              <span className="text-gray-300">+252 61x 123 456</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[80%] mx-auto mt-10 pt-10 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2026 East Africa Tours. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
