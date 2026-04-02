import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
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
      await axios.post(
        "http://localhost:9005/api/logout",
        {},
        { withCredentials: true },
      );
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

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-[100] border-b border-slate-100">
      <nav className="mx-auto w-[90%] py-4 flex justify-between items-center lg:w-[80%]">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-800">
            East Africa <span className="text-emerald-600">Tours</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/"
            className="hover:text-emerald-600 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/tours"
            className="hover:text-emerald-600 font-medium transition-colors"
          >
            Tours
          </Link>
          <Link
            to="/bookings"
            className="hover:text-emerald-600 font-medium transition-colors"
          >
            My Bookings
          </Link>

          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition-all flex items-center gap-2 text-sm font-bold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md font-bold"
            >
              Login
            </Link>
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
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/tours" onClick={() => setOpen(false)}>
              Tours
            </Link>
            <Link to="/bookings" onClick={() => setOpen(false)}>
              My Bookings
            </Link>
            <div className="w-[80%] pt-6 border-t">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-center"
                >
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
