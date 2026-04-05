import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSave } from "react-icons/fa";
import Menu from "./Menu";
import AdminAvatar from "./AdminAvatar";

function Setting() {
  // Load admin data from LocalStorage before rendering
  const savedAdmin = JSON.parse(localStorage.getItem("adminUser"));

  const [admin, setAdmin] = useState({
    username: savedAdmin ? savedAdmin.email.split("@")[0] : "",
    email: savedAdmin ? savedAdmin.email : "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("Success: Your information has been updated!");
    // Halkan waxaad ku dari kartaa axios.put si aad database ugu xirto
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <div className="w-[18%] bg-[#0f172a] h-screen sticky top-0">
        <Menu />
      </div>

      <div className="flex-1 flex flex-col">
        <AdminAvatar />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Admin Settings
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Maamul profile-kaaga iyo amaanka account-ka.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PROFILE CARD */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col items-center">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-emerald-50 shadow-inner">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-3 rounded-2xl shadow-lg border-4 border-white">
                  <FaCamera size={14} />
                </div>
              </div>
              <h3 className="mt-6 font-black text-slate-800 text-xl capitalize">
                {admin.username}
              </h3>
              <p className="text-emerald-600 font-bold text-xs bg-emerald-50 px-4 py-1 rounded-full mt-2 uppercase">
                Super Admin
              </p>
            </div>

            {/* FORM CARD */}
            <div className="lg:col-span-2 bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        name="username"
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
                        value={admin.username}
                        onChange={handleChange}
                      />
                      <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        name="email"
                        type="email"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
                        value={admin.email}
                        onChange={handleChange}
                      />
                      <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <h3 className="font-black text-slate-800 mb-6">
                    Security Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase ml-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          name="currentPassword"
                          type="password"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all"
                          placeholder="••••••••"
                          onChange={handleChange}
                        />
                        <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase ml-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          name="newPassword"
                          type="password"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all"
                          placeholder="Enter new password"
                          onChange={handleChange}
                        />
                        <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <FaSave /> Save Changes
                  </button>
                  <button
                    type="button"
                    className="px-8 bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Setting;
