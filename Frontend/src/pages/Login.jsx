import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:9005/api/auth/google";
  };
  const handleGithubLogin = () => {
    window.location.href = "http://localhost:9005/api/auth/github";
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9005/api/login",
        formData,
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful!");
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Email ama Password khaldan!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9f9] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center text-[#059669] mb-2 mt-20">
          <svg
            className="w-8 h-8 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            East Africa Tours
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Welcome</h1>
        <p className="text-slate-500 mt-1">Fadlan geli macluumaadkaaga</p>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-700"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>
          <button
            type="button"
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-semibold"
          >
            <FaGithub className="text-2xl" /> GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-medium">
              or Email and password
            </span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email" // Muhiim u ah handleChange
              placeholder="tusaale@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password" // Muhiim u ah handleChange
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span className="text-sm text-slate-600">I xasuuso</span>
            </label>
            <span className="text-sm text-emerald-600 font-bold hover:underline cursor-pointer">
              forget password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-200 transition-all transform active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Don't have account?{" "}
          <Link
            to="/signup"
            className="text-emerald-600 font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
