import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import navigate for the routing
import {
  FaGlobe,
  FaSuitcase,
  FaUserShield,
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import TourModal from "../components/TourModal";
import AdminModal from "../components/AdminModal";

const AdminDashboard = () => {
  const navigate = useNavigate(); // 👈 Initialize routing hook

  const [activeTab, setActiveTab] = useState("tours");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Tracking what item is being edited (null means "Add New")
  const [editingTour, setEditingTour] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);

  // 📂 State lists
  const [tours, setTours] = useState([
    {
      id: 1,
      name: "Serengeti Safari Adventure",
      country: "Tanzania",
      price: 1200,
      status: "Active",
    },
    {
      id: 2,
      name: "Lamu Island Beach Retreat",
      country: "Kenya",
      price: 850,
      status: "Active",
    },
    {
      id: 3,
      name: "Simien Mountains Trek",
      country: "Ethiopia",
      price: 950,
      status: "Active",
    },
  ]);

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@eastafricatours.com",
      role: "Super Admin",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@eastafricatours.com",
      role: "Admin",
    },
    {
      id: 3,
      name: "Amina Hassan",
      email: "amina@eastafricatours.com",
      role: "Admin",
    },
  ]);

  // --------------------------------------------------
  // 🔴 TOURS CRUD FUNCTIONS
  // --------------------------------------------------
  const handleSaveTour = (tourData) => {
    if (editingTour) {
      // 🔄 Update Existing
      setTours(
        tours.map((t) =>
          t.id === editingTour.id
            ? {
                ...t,
                name: tourData.title,
                country: tourData.country,
                price: Number(tourData.price),
                status: tourData.status,
              }
            : t,
        ),
      );
    } else {
      // ➕ Create New
      setTours([
        ...tours,
        {
          id: tours.length + 1,
          name: tourData.title,
          country: tourData.country,
          price: Number(tourData.price),
          status: tourData.status,
        },
      ]);
    }
    setEditingTour(null);
  };

  const handleDeleteTour = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      setTours(tours.filter((tour) => tour.id !== id));
    }
  };

  const handleEditTourClick = (tour) => {
    setEditingTour(tour); // 👈 Set target to edit
    setIsTourModalOpen(true); // 👈 Pop Modal Open
  };

  // --------------------------------------------------
  // 🟢 ADMINS CRUD FUNCTIONS
  // --------------------------------------------------
  const handleSaveAdmin = (adminData) => {
    if (editingAdmin) {
      // 🔄 Update Existing
      setAdmins(
        admins.map((a) =>
          a.id === editingAdmin.id
            ? {
                ...a,
                name: adminData.fullName,
                email: adminData.email,
                role: adminData.role,
              }
            : a,
        ),
      );
    } else {
      // ➕ Create New
      setAdmins([
        ...admins,
        {
          id: admins.length + 1,
          name: adminData.fullName,
          email: adminData.email,
          role: adminData.role,
        },
      ]);
    }
    setEditingAdmin(null);
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this administrator?")) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  const handleEditAdminClick = (admin) => {
    setEditingAdmin(admin);
    setIsAdminModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col justify-between w-64 bg-[#0d1424] text-white transform transition-transform duration-300 lg:translate-x-0 lg:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-700">
            <FaGlobe className="text-xl text-emerald-400" />
            <span className="text-lg font-semibold tracking-wide">
              Admin Panel
            </span>
          </div>

          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab("tours");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center w-full gap-3 px-4 py-3 font-medium transition-colors rounded-lg ${activeTab === "tours" ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <FaSuitcase /> Manage Tours
            </button>
            <button
              onClick={() => {
                setActiveTab("admins");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center w-full gap-3 px-4 py-3 font-medium transition-colors rounded-lg ${activeTab === "admins" ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              <FaUserShield /> Manage Admins
            </button>
          </nav>
        </div>

        {/* 🔗 Navigate Back To Web Site Link Toggle */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => navigate("/")} // 👈 Redirects to Home route
            className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaArrowLeft /> Back to Website
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b lg:hidden border-slate-200">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <FaGlobe className="text-emerald-500" /> <span>Admin Panel</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-xl rounded-md text-slate-600 hover:bg-gray-100"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto md:p-10">
          <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {activeTab === "tours" ? "Manage Tours" : "Manage Admins"}
            </h1>

            <button
              onClick={() => {
                if (activeTab === "tours") {
                  setEditingTour(null); // Clear editing context first
                  setIsTourModalOpen(true);
                } else {
                  setEditingAdmin(null); // Clear editing context first
                  setIsAdminModalOpen(true);
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-all text-sm"
            >
              <FaPlus size={14} />
              {activeTab === "tours" ? "Add Tour" : "Add Admin"}
            </button>
          </div>

          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 border-slate-200">
                    {activeTab === "tours" ? (
                      <>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Tour Name
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Country
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Price
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Status
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Name
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Email
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Role
                        </th>
                      </>
                    )}
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeTab === "tours"
                    ? tours.map((tour) => (
                        <tr
                          key={tour.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-slate-800">
                            {tour.name}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {tour.country}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-800">
                            ${tour.price}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                              {tour.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => handleEditTourClick(tour)}
                                className="p-2 text-blue-600 rounded-md hover:bg-blue-50"
                              >
                                <FaEdit className="text-lg" />
                              </button>
                              <button
                                onClick={() => handleDeleteTour(tour.id)}
                                className="p-2 text-red-500 rounded-md hover:bg-red-50"
                              >
                                <FaTrashAlt className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : admins.map((admin) => (
                        <tr
                          key={admin.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-slate-800">
                            {admin.name}
                          </td>
                          <td className="px-6 py-4 text-slate-600">
                            {admin.email}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${admin.role === "Super Admin" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-indigo-50 text-indigo-700 border-indigo-200"}`}
                            >
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => handleEditAdminClick(admin)}
                                className="p-2 text-blue-600 rounded-md hover:bg-blue-50"
                              >
                                <FaEdit className="text-lg" />
                              </button>
                              <button
                                onClick={() => handleDeleteAdmin(admin.id)}
                                className="p-2 text-red-500 rounded-md hover:bg-red-50"
                              >
                                <FaTrashAlt className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <TourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onSubmit={handleSaveTour}
        editData={editingTour} // 👈 For Pre-filling Update forms
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSubmit={handleSaveAdmin}
        editData={editingAdmin} // 👈 For Pre-filling Update forms
      />
    </div>
  );
};

export default AdminDashboard;
