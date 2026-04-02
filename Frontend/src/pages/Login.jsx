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
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("userLogin"));

        alert("Login Successful!");
        navigate("/");
      } else {
        alert(res.data.message || "Email ama Password khaldan!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Xogta aad gelisay waa khaldan tahay!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9f9] flex flex-col items-center justify-center p-4 font-sans">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center text-[#059669] mb-2 mt-10">
          <svg
            className="w-10 h-10 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">
            Hariye Tour <span className="text-emerald-600">Agency</span>
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-4">Welcome</h1>
        <p className="text-slate-500 mt-2">
          Please enter your information to log in.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>
          <button
            type="button"
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold"
          >
            <FaGithub className="text-2xl" /> GitHub
          </button>
        </div>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative bg-white px-4 text-xs uppercase text-slate-400 font-bold">
            or Email & Password
          </span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-slate-50/50"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                Remember me
              </span>
            </label>
            <span className="text-sm text-emerald-600 font-bold hover:text-emerald-700 cursor-pointer">
              Forget password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-100 transition-all transform active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-10 text-slate-500 font-medium">
          Do you have account?{" "}
          <Link
            to="/signup"
            className="text-emerald-600 font-bold hover:underline ml-1"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
