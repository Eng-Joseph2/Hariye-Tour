import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:9005/api/login", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("userLogin"));
        navigate("/");
      } else {
        alert(response.data.message || "Email ama Password khaldan!");
      }
    } catch (error) {
      alert("Xogta aad gelisay waa khaldan tahay!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative w-full max-w-[400px]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 mb-4 bg-white rounded-lg shadow-sm border border-slate-100">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <path stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Log in to your account</p>
        </div>

        {/* The Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100">
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => window.location.href = "http://localhost:9005/api/auth/google"}
              className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-all text-sm font-semibold text-slate-600 shadow-sm"
            >
              <FcGoogle className="text-lg" /> Google
            </button>
            <button
              onClick={() => window.location.href = "http://localhost:9005/api/auth/github"}
              className="flex items-center justify-center gap-2 py-2 bg-slate-900 text-white rounded-md hover:bg-black transition-all text-sm font-semibold shadow-sm"
            >
              <FaGithub className="text-lg" /> GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative flex justify-center">
                <span className="bg-white px-3 text-[10px] uppercase tracking-widest text-slate-400 font-bold">OR</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Email */}
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm transition-all"
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm transition-all"
              />
            </div>

            <div className="flex items-center justify-between px-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-emerald-600 rounded-sm cursor-pointer border-slate-300" />
                <span className="text-xs text-slate-500 font-medium">Keep me signed in</span>
              </label>
              <button type="button" className="text-xs text-emerald-600 font-bold hover:underline">Forgot?</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-md shadow-md shadow-emerald-500/10 active:scale-[0.99] transition-all text-sm disabled:opacity-70 mt-2"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-slate-500 font-medium">
            New here? 
            <Link to="/signup" className="text-emerald-600 font-bold hover:underline ml-1.5 transition-colors">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;