import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserFriends, FaEnvelope, FaUser, FaTrashAlt } from "react-icons/fa";
import Menu from "../Dashbord/Menu";
import AdminAvatar from "../Dashbord/AdminAvatar";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://hariye-tour-agency.onrender.com/api/readAuth",
        );
        setCustomers(res.data.data || res.data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
        console.log(loading);
      }
    };

    getData();
  }, []);

  // 2. Tirtirista Macmiilka
  const deleteCustomer = (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirto macmiilkan?")) {
      axios
        .delete(`https://hariye-tour-agency.onrender.com/api/deleteUser/${id}`)
        .then(() => {})
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Waan ka xunnahay, tirtirista ma suuroobin.");
        });
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* SIDEBAR - Fixed width for consistency */}
      <div className="w-[18%] bg-[#0f172a] h-screen sticky top-0 overflow-y-auto">
        <Menu />
      </div>

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* TOP NAVBAR */}
        <AdminAvatar />

        <main className="p-8">
          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <FaUserFriends className="text-emerald-600" /> Registered
                Customers
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Dhamaan dadka iska diiwaangeliyey Hariye Tour.
              </p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl font-bold text-sm shadow-sm">
              Total: {customers.length} Users
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center w-20">
                      #
                    </th>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Full Name
                    </th>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                      Gmail Address
                    </th>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {customers.length > 0 ? (
                    customers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-slate-50/30 transition-colors group"
                      >
                        <td className="p-6 text-sm text-slate-400 font-bold text-center">
                          {index + 1}
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold shadow-sm border border-emerald-100">
                              <FaUser size={14} />
                            </div>
                            {/* 1. HALKAN KA EEG: 'user.name' ayaan u bedelay maadaama xogtaada JSON ay 'name' tahay */}
                            <span className="text-sm text-slate-800 font-black capitalize">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium italic">
                            <FaEnvelope className="text-slate-300" />
                            {user.email}{" "}
                            {/* 2. HALKANNA: 'user.email' waa sax */}
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <button
                            onClick={() => deleteCustomer(user._id)} // 3. ID-gu waa '_id' sidii ku jirtay xogta
                            className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                          >
                            <FaTrashAlt size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-20 text-center text-slate-400 font-bold"
                      >
                        Hadda ma jiraan macaamiil diiwaangelisan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CustomerTable;
