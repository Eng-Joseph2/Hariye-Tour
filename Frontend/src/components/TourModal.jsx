import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import CustomSelect from "../components/ui/CustomSelect"; // 👈 Import our UI Component

const TourModal = ({ isOpen, onClose, onSubmit, editData }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    country: "",
    category: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    maxGuests: "15",
    availableSpots: "15",
    status: "Active",
    imageURL: "",
    description: "",
    highlights: "",
  });

  // 📝 Pre-fill inputs when clicking the Edit Button
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.name || "",
        location: editData.location || editData.country || "", // Fallback
        country: editData.country || "",
        category: editData.category || "",
        price: editData.price || "",
        duration: editData.duration || "",
        startDate: editData.startDate || "",
        endDate: editData.endDate || "",
        maxGuests: editData.maxGuests || "15",
        availableSpots: editData.availableSpots || "15",
        status: editData.status || "Active",
        imageURL: editData.imageURL || "",
        description: editData.description || "",
        highlights: editData.highlights || "",
      });
    } else {
      // Clear forms for standard Add New Flow
      setFormData({
        title: "",
        location: "",
        country: "",
        category: "",
        price: "",
        duration: "",
        startDate: "",
        endDate: "",
        maxGuests: "15",
        availableSpots: "15",
        status: "Active",
        imageURL: "",
        description: "",
        highlights: "",
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🛠️ Custom handler specifically built for custom functional drops
  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex flex-col w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800">
            {editData ? "Update Tour" : "Add New Tour"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 px-6 py-5 space-y-5 overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Tour Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* ✅ Swapped Country To CustomSelect */}
            <CustomSelect
              label="Country"
              options={["Somalia", "Kenya", "Tanzania", "Ethiopia", "Uganda", "Rwanda", "Djibouti", "South Sudan", "Eritrea", "Burundi"]}
              value={formData.country}
              required={true}
              onChange={(val) => handleSelectChange("country", val)}
            />
            {/* ✅ Custom Category Select */}
            <CustomSelect
              label="Category"
              options={[
                "Nature",
                "Beaches",
                "Forests",
                "Farms",
                "Historical",
                "Restaurants",
              ]}
              value={formData.category}
              required={true}
              onChange={(val) => handleSelectChange("category", val)}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Price (USD) *
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Max Guests *
              </label>
              <input
                type="number"
                name="maxGuests"
                required
                value={formData.maxGuests}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Available Spots *
              </label>
              <input
                type="number"
                name="availableSpots"
                required
                value={formData.availableSpots}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* ✅ Swapped Status To CustomSelect */}
            <CustomSelect
              label="Status"
              options={["Active", "Inactive"]}
              value={formData.status}
              required={true}
              onChange={(val) => handleSelectChange("status", val)}
            />
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Image URL *
              </label>
              <input
                type="url"
                name="imageURL"
                required
                value={formData.imageURL}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Description *
            </label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Highlights (one per line)
            </label>
            <textarea
              name="highlights"
              rows={3}
              value={formData.highlights}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </form>

        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border rounded-lg border-slate-200 text-slate-700 hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 shadow-sm"
          >
            {editData ? "Update Tour" : "Create Tour"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourModal;
