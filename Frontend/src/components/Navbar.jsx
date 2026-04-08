import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinkStyles = ({ isActive }) =>
    `font-bold transition-colors ${
      isActive
        ? "bg-gradient-to-r from-[#22c55e] to-[#059669] bg-clip-text text-transparent"
        : "text-slate-600 hover:text-emerald-500"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const initials = user
    ? user.name
        .split(" ")
        .map((part) => part[0]?.toUpperCase())
        .join("")
        .slice(0, 2)
    : "";

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-[100] border-b border-slate-100">
      <nav className="mx-auto w-[90%] py-4 flex justify-between items-center lg:w-[80%]">
        {/* Logo */}
        <Link to="/" className="flex items-center group font-display">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient
                id="logo-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
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
          <span className="text-xl font-bold tracking-tight">
            Hariye Tour Agency
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink title="Home" to="/" className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink title="Tours" to="/tours" className={navLinkStyles}>
            Tours
          </NavLink>
          <NavLink title="My Bookings" to="/bookings" className={navLinkStyles}>
            My Bookings
          </NavLink>
          {user ? (
            <>
              {user.role !== "user" && (
                <NavLink title="Dashboard" to="/admin-dash" className={navLinkStyles}>
                  Dashboard
                </NavLink>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="font-bold text-slate-600 hover:text-emerald-500"
              >
                Logout
              </button>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-emerald-700">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {initials}
                </span>
                <span className="text-sm">{user.name.split(" ")[0]}</span>
              </div>
            </>
          ) : (
            <NavLink title="Login" to="/login" className={navLinkStyles}>
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <div
          className="md:hidden text-2xl text-emerald-600 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed top-[72px] left-0 w-full bg-white shadow-2xl flex flex-col items-center gap-6 py-10 md:hidden z-50 border-t border-slate-50">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navLinkStyles}
            >
              Home
            </NavLink>
            <NavLink
              to="/tours"
              onClick={() => setOpen(false)}
              className={navLinkStyles}
            >
              Tours
            </NavLink>
            <NavLink
              to="/bookings"
              onClick={() => setOpen(false)}
              className={navLinkStyles}
            >
              My Bookings
            </NavLink>
            {user && user.role !== "user" && (
              <NavLink
                to="/admin-dash"
                onClick={() => setOpen(false)}
                className={navLinkStyles}
              >
                Dashboard
              </NavLink>
            )}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="font-bold text-slate-600 hover:text-emerald-500"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={navLinkStyles}
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
