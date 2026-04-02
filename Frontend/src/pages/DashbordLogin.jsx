import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaExclamationCircle, FaArrowLeft } from "react-icons/fa";

function DashbordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const allowedAdmins = [
    { email: "mohamed22@gmail.com", password: "maxamed123" },
    { email: "abdiqani@gmail.com", password: "abdiqani123" },
  ];

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    const isAdmin = allowedAdmins.find(
      (admin) => admin.email === email && admin.password === password,
      navigate("/admin-dash"),
      alert("sucess "),
    );

    if (!isAdmin) {
      setError("Email ama Password-ka waa khaldan yihiin.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:9005/api/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("userLogin"));
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Cillad ayaa ka jirta server-ka.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        {/* Top Header Section */}
        <div className="bg-[#059669] pt-12 pb-20 px-8 text-center relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors"
          >
            <FaArrowLeft />
          </button>

          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-white p-1.5 rounded-lg">
              <svg
                className="w-5 h-5 text-[#059669]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            </div>
            <span className="text-white font-bold tracking-tight text-lg">
              Admin Panel
            </span>
          </div>

          <h2 className="text-white text-3xl font-bold">Soo dhawoow Admin</h2>
          <p className="text-emerald-100/80 text-sm mt-2">
            Maamulka East Africa Tours
          </p>
        </div>

        {/* Admin Avatar Area */}
        <div className="relative flex justify-center -mt-14 mb-6">
          <div className="p-1.5 bg-white rounded-full shadow-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
              alt="Admin"
              className="w-24 h-24 rounded-full border-2 border-slate-50 object-cover"
            />
            <div className="absolute bottom-2 right-3 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="px-10 pb-10 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold animate-shake">
              <FaExclamationCircle />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-700"
              placeholder="admin@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-700"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] mt-4"
          >
            Gali Dashboard-ka
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashbordLogin;
