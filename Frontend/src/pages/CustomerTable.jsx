import React, { useEffect, useState } from "react";
import { FaUserFriends, FaEnvelope, FaUser, FaTrashAlt } from "react-icons/fa";
import Menu from "../Dashbord/Menu";
import AdminAvatar from "../Dashbord/AdminAvatar";
import AdminModal from "../components/AdminModal";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [activeTab, setActiveTab] = useState("customers");
  const { user } = useAuth();

  const isSuperAdmin = user?.role?.toLowerCase() === "superadmin";
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const fetchData = async () => {
    try {
      let endpoint;
      if (isSuperAdmin) {
        endpoint = activeTab === "customers" ? "/readUser" : "/readAdmin";
      } else {
        endpoint = "/readUser";
      }
      const res = await API.get(endpoint);
      setCustomers(res.data.data || []);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const deleteUser = async (id) => {
    const confirmMessage = activeTab === "customers" ? "customer" : "admin";
    if (!window.confirm(`Are you sure you want to delete this ${confirmMessage}?`)) {
      return;
    }

    try {
      await API.delete(`/deleteUser/${id}`);
      setCustomers((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Sorry, the deletion could not be completed.");
    }
  };

  const canDelete = (targetUser) => {
    if (isAdmin) return false; // normal admin can't delete anyone
    if (isSuperAdmin) {
      if (activeTab === "customers") return false; // superadmin can't delete customers
      return targetUser.role === "admin"; // can delete admins, but not superadmins
    }
    return false;
  };

  const handleCreateAdmin = async (formData) => {
    try {
      await API.post(
        "/auth/register-admin",
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role.toLowerCase().replace(" ", ""),
        },
        {
          headers: {
            "x-super-admin": "true",
          },
        },
      );
      fetchData();
      setShowAdminModal(false);
      alert("Admin account created successfully.");
    } catch (error) {
      console.error("Admin creation error:", error);
      alert(
        error.response?.data?.message ||
          "Unable to create admin account. Please try again.",
      );
    }
  };

  const getTitle = () => {
    if (isSuperAdmin) {
      return activeTab === "customers" ? "Customers" : "Admins";
    }
    return "Customers";
  };

  const getDescription = () => {
    if (isSuperAdmin) {
      return `All ${activeTab} registered with Hariye Tour.`;
    }
    return "All customers registered with Hariye Tour.";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSubmit={handleCreateAdmin}
      />

      {/* SIDEBAR - Fixed width for consistency */}
      <div className="w-[18%] bg-[#0f172a] h-screen sticky top-0 overflow-y-auto">
        <Menu />
      </div>

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <AdminAvatar />

        <main className="p-8">
          <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                <FaUserFriends className="text-emerald-600" /> Registered{" "}
                {getTitle()}
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                {getDescription()}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl font-bold text-sm shadow-sm">
                Total: {customers.length} {getTitle().toLowerCase()}
              </div>
              {isSuperAdmin && activeTab === "admins" && (
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Add Admin
                </button>
              )}
            </div>
          </div>

          {isSuperAdmin && (
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setActiveTab("customers")}
                className={`px-6 py-3 rounded-2xl font-bold transition ${
                  activeTab === "customers"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Customers
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`px-6 py-3 rounded-2xl font-bold transition ${
                  activeTab === "admins"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Admins
              </button>
            </div>
          )}

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
                            <span className="text-sm text-slate-800 font-black capitalize">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium italic">
                            <FaEnvelope className="text-slate-300" />
                            {user.email}
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          {canDelete(user) && (
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="p-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                            >
                              <FaTrashAlt size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-20 text-center text-slate-400 font-bold"
                      >
                        There are currently no registered {getTitle().toLowerCase()}.
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
