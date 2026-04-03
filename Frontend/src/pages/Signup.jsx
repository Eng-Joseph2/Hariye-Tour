import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      return alert("Passwords do not match!");
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:9005/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm: formData.confirm,
      });

      if (response.data.success) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accents to match Login */}
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
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">Join Hariye Tour Agency today</p>
        </div>

        {/* The Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm transition-all"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="password"
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm transition-all"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 px-0.5 py-1">
              <input
                type="checkbox"
                required
                className="w-4 h-4 accent-emerald-600 rounded-sm cursor-pointer border-slate-300"
              />
              <span className="text-[11px] text-slate-500 leading-tight">
                I agree to the <span className="text-emerald-600 font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-emerald-600 font-bold hover:underline cursor-pointer">Privacy Policy</span>.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-md shadow-md shadow-emerald-500/10 active:scale-[0.99] transition-all text-sm disabled:opacity-70"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-bold hover:underline ml-1 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;