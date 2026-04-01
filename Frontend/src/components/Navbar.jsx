import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    // Added 'fixed top-0 left-0 w-full' to keep it at the top
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-[100]">
      <nav className="mx-auto w-[90%] px-0 py-4 flex justify-between items-center lg:w-[80%]">
        {/* Logo */}
        <Link to="/">
          <div className="flex justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-emerald-600"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-lg md:text-xl font-bold text-green-600">
              East Africa Tours
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-green-600 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/tours"
            className="hover:text-green-600 font-medium transition-colors"
          >
            Tours
          </Link>
          <Link
            to="/bookings"
            className="hover:text-green-600 font-medium transition-colors"
          >
            My Bookings
          </Link>

          <Link
            to="/login"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
          >
            Login
          </Link>
        </div>

        {/* Mobile Icon */}
        <div
          className="md:hidden text-xl text-green-600 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        {open && (
          // Adjusted 'top' to match navbar height exactly
          <div className="fixed top-[72px] left-0 w-full bg-white shadow-xl flex flex-col items-center gap-6 py-8 md:hidden z-50 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="/tours"
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              Tours
            </Link>
            <Link
              to="/bookings"
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              My Bookings
            </Link>

            <div className="w-[80%]">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition shadow-md"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
