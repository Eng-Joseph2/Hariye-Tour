import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registration successful. Redirecting...");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Card */}
        <div className="relative bg-white border border-slate-200 shadow-xl rounded-3xl p-8">
          {/* Soft Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-400/20 blur-3xl rounded-full"></div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create your account ✨
          </h1>
          <p className="text-slate-500 mb-6 text-sm">
            Join and start booking amazing tours easily.
          </p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-600">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm text-slate-700 font-medium">
                Full name
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition">
                <User size={18} className="text-slate-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-slate-700 font-medium">Email</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-700 font-medium">
                Password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 transition py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
