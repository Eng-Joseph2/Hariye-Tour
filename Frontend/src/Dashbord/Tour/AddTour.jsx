import { useState, useEffect, useRef } from "react";
import { FaTimes, FaExclamationCircle, FaCloudUploadAlt } from "react-icons/fa";
import CustomSelect from "../../components/ui/CustomSelect";

const AddTour = ({ isOpen, onClose, onSubmit, editData }) => {
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // State keys match your Backend Model exactly
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    country: "",
    category: "Nature",
    price: "",
    Duration: "",
    startDay: "",
    endDay: "",
    max_Gust: "15",
    Available_Spots: "15",
    status: "Active",
    desc: "",
    Highlights: "",
  });

  // Load Edit Data or Reset Form
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      if (editData) {
        setFormData({ ...editData });
      } else {
        setFormData({
          title: "",
          city: "",
          country: "",
          category: "",
          price: "",
          Duration: "",
          startDay: "",
          endDay: "",
          max_Gust: "",
          Available_Spots: "",
          status: "Active",
          desc: "",
          Highlights: "",
        });
      }
      setImageFile(null);
    }
  }, [editData, isOpen]);

  // Automated Date Calculation (startDay + Duration = endDay)
  useEffect(() => {
    if (formData.startDay && formData.Duration) {
      const start = new Date(formData.startDay);
      const days = parseInt(formData.Duration);
      if (!isNaN(start.getTime()) && days > 0) {
        const end = new Date(start);
        end.setDate(start.getDate() + days);
        const formattedEnd = end.toISOString().split("T")[0];
        if (formData.endDay !== formattedEnd) {
          setFormData((prev) => ({ ...prev, endDay: formattedEnd }));
        }
      }
    }
  }, [formData.startDay, formData.Duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // 1. Append text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // 2. Append Image File
      if (imageFile) {
        data.append("image", imageFile);
      }

      const url = editData
        ? `https://hariye-tour-agency.onrender.com/api/updateTour/${editData._id}`
        : "https://hariye-tour-agency.onrender.com/api/tourRegister";

      const response = await fetch(url, {
        method: editData ? "PUT" : "POST",
        body: data, // Browser automatically sets Content-Type to multipart/form-data
      });

      const result = await response.json();

      if (response.ok) {
        onSubmit(result.data);
        onClose();
        alert(
          editData
            ? "Tour updated successfully!"
            : "Tour published successfully!",
        );
      } else {
        alert(`Error: ${result.message || "Failed to save"}`);
        console.log(errors);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Server is unreachable.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 flex flex-col w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editData ? "Update Tour Package" : "Create New Tour"}
            </h2>
            <p className="text-[11px] text-slate-500">
              Enter details to publish to the Hariye Tour platform.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="flex-1 px-6 py-5 space-y-5 overflow-y-auto bg-white">
            {/* Title & City */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Tour Title *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Tropical Paradise"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 focus:border-emerald-500 text-sm"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  City / Location *
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Liido Beach"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 focus:border-emerald-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Country & Category */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <CustomSelect
                label="Country *"
                options={["Somalia", "Kenya", "Tanzania", "Ethiopia"]}
                value={formData.country}
                onChange={(val) => setFormData({ ...formData, country: val })}
              />
              <CustomSelect
                label="Category *"
                options={["Nature", "Beaches", "Forests", "Historical"]}
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
            </div>

            {/* Price & Duration */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Price (USD) *
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 focus:border-emerald-500 text-sm"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Duration (Days) *
                </label>
                <input
                  name="Duration"
                  type="number"
                  value={formData.Duration}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 focus:border-emerald-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Start Date *
                </label>
                <input
                  name="startDay"
                  type="date"
                  value={formData.startDay}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 focus:border-emerald-500 text-sm"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  End Date (Calculated)
                </label>
                <input
                  name="endDay"
                  type="date"
                  value={formData.endDay}
                  readOnly
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-100 cursor-not-allowed text-sm"
                />
              </div>
            </div>

            {/* Spots & Status */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Max Guests *
                </label>
                <input
                  name="max_Gust"
                  type="number"
                  value={formData.max_Gust}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 focus:border-emerald-500 text-sm"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Available Spots *
                </label>
                <input
                  name="Available_Spots"
                  type="number"
                  value={formData.Available_Spots}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-slate-50 focus:border-emerald-500 text-sm"
                />
              </div>
              <CustomSelect
                label="Status *"
                options={["Active", "InActive"]}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
            </div>

            {/* Image Upload Area */}
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                Tour Image *
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-full px-3 py-4 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer flex flex-col items-center justify-center hover:border-emerald-500 bg-slate-50 transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                  accept="image/*"
                />
                <FaCloudUploadAlt size={24} className="text-slate-400 mb-1" />
                <span className="text-xs text-slate-500">
                  {imageFile ? imageFile.name : "Click to upload image file"}
                </span>
              </div>
            </div>

            {/* Description & Highlights */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Description *
                </label>
                <textarea
                  name="desc"
                  rows={3}
                  value={formData.desc}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                  Highlights (One per line)
                </label>
                <textarea
                  name="Highlights"
                  rows={2}
                  value={formData.Highlights}
                  onChange={handleChange}
                  placeholder="Free lunch&#10;Private guide"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-800"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:bg-emerald-300 transition-all"
            >
              {loading
                ? "Saving..."
                : editData
                  ? "Save Changes"
                  : "Publish Tour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTour;
