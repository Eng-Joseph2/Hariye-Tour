import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const updateNavbar = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener("userLogin", updateNavbar);
    window.addEventListener("storage", updateNavbar);

    return () => {
      window.removeEventListener("userLogin", updateNavbar);
      window.removeEventListener("storage", updateNavbar);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:9005/api/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      setOpen(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  // Helper for active link styling
  const navLinkStyles = ({ isActive }) =>
    `font-sans font-semibold transition-colors ${
      isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-500"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-[100] border-b border-slate-100">
      <nav className="mx-auto w-[90%] py-4 flex justify-between items-center lg:w-[80%]">
        
        {/* Logo */}
        <Link to="/" className="flex items-center text-[#059669] font-display">
          <svg className="w-10 h-10 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xl font-bold tracking-tight">Hariye Tour Agency</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink title="Home" to="/" className={navLinkStyles}>Home</NavLink>
          <NavLink title="Tours" to="/tours" className={navLinkStyles}>Tours</NavLink>
          <NavLink title="My Bookings" to="/bookings" className={navLinkStyles}>My Bookings</NavLink>

          {/* Conditional User Section */}
          <div className="flex items-center gap-4 pl-6 ml-2 border-l border-slate-200">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-900 leading-none">{user.fullName || user.name}</span>
                  <button onClick={handleLogout} className="text-[11px] font-bold text-red-500 hover:underline uppercase tracking-wider mt-1">
                    Sign Out
                  </button>
                </div>
                {/* Avatar Icon */}
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold shadow-sm">
                   {(user.fullName || user.name || "U").charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md font-bold text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-2xl text-emerald-600 cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed top-[72px] left-0 w-full bg-white shadow-2xl flex flex-col items-center gap-6 py-10 md:hidden z-50 border-t border-slate-50">
            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkStyles}>Home</NavLink>
            <NavLink to="/tours" onClick={() => setOpen(false)} className={navLinkStyles}>Tours</NavLink>
            <NavLink to="/bookings" onClick={() => setOpen(false)} className={navLinkStyles}>My Bookings</NavLink>
            
            <div className="w-[85%] pt-6 border-t flex flex-col items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                       {(user.fullName || user.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-800">{user.fullName || user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="w-full bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="block w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-center">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;