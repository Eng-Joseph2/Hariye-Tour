import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import AdminAvatar from "../AdminAvatar";
import { Edit, Trash2, Plus } from "lucide-react";
import axios from "axios";
// Import your AddTour component
import AddTour from "./AddTour";

function TourTable() {
  const [tours, setTours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal
  const [editData, setEditData] = useState(null); // State for Editing

  const fetchTours = () => {
    axios
      .get("http://localhost:9005/api/readAllTour")
      .then((res) => setTours(res.data.data))
      .catch((error) => console.log("Error fetching tours:", error));
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleAddNew = () => {
    setEditData(null); // Clear edit data
    setIsModalOpen(true); // Open Modal
  };

  const handleEdit = (tour) => {
    setEditData(tour); // Pass tour data to modal
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    const url = editData
      ? `http://localhost:9005/api/updateTour/${editData._id}`
      : "http://localhost:9005/api/addTour";

    const method = editData ? "put" : "post";

    axios[method](url, formData)
      .then(() => {
        alert(editData ? "Tour Updated!" : "Tour Created!");
        fetchTours();
        setIsModalOpen(false);
      })
      .catch(err => alert("Error saving tour"));
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      <div className="w-[18%] bg-[#0f172a] h-screen sticky top-0">
        <Menu />
      </div>

      <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
        <AdminAvatar />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-slate-800">Manage All Tours</h1>
            {/* REMOVED <Link> - Using onClick instead */}
            <button
              onClick={handleAddNew}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg"
            >
              <Plus size={18} /> Add New Tour
            </button>
          </div>

          <div className="">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    T.NO
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    Image
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    Country
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    City
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    Price
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    Days
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    Max Gust
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-500 uppercase text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tours.map((tour, index) => (
                  <tr
                    key={tour._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4 text-sm text-slate-600 font-medium">
                      #{index + 1}
                    </td>
                    <td className="p-4">
                      <div className="w-12 h-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img
                          src={`http://localhost:9005/images/${tour.image}`}
                          alt={tour.city}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-700 font-semibold">
                      {tour.country}
                    </td>
                    <td className="p-4 text-sm text-slate-600">{tour.city}</td>
                    <td className="p-4 text-sm font-bold text-emerald-600">
                      ${tour.price}
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {tour.days} Days
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {tour.max_Gust} People
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tour.available === "yes"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {tour.available === "yes" ? "ACTIVE" : "InActive"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteTour(tour._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* THE MODAL COMPONENT */}
      <AddTour
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
    </div>
  );
}

export default TourTable;
