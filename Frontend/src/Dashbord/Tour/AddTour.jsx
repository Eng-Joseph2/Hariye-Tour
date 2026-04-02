import { useState, useEffect, useRef } from "react";
import { FaTimes, FaExclamationCircle, FaCloudUploadAlt } from "react-icons/fa";
import CustomSelect from "../../components/ui/CustomSelect";

const AddTour = ({ isOpen, onClose, onSubmit, editData }) => {
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  // State updated to match Backend Model keys
  const [formData, setFormData] = useState({
    title: "",
    city: "", // matches backend 'city'
    country: "",
    category: "",
    price: "",
    Duration: "", // matches backend 'Duration'
    startDay: "", // matches backend 'startDay'
    endDay: "", // matches backend 'endDay'
    max_Gust: "15", // matches backend 'max_Gust'
    Available_Spots: "15", // matches backend 'Available_Spots'
    status: "Active",
    desc: "", // matches backend 'desc'
    Highlights: "", // matches backend 'Highlights'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 1. Load/Reset Logic
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setImageFile(null);
      if (editData) {
        setFormData({
          ...editData,
          Highlights: Array.isArray(editData.Highlights)
            ? editData.Highlights.join("\n")
            : editData.Highlights || "",
        });
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
          max_Gust: "15",
          Available_Spots: "15",
          status: "Active",
          desc: "",
          Highlights: "",
        });
      }
    }
  }, [editData, isOpen]);

  // 2. Automated Date Calculation
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

  // 3. Centralized Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      if (errors.image) setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // 4. Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Select a country";
    if (!imageFile && !editData) newErrors.image = "Image is required";
    if (!formData.desc || formData.desc.length < 10)
      newErrors.desc = "Too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 5. Backend Integration (POST/PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append Image File
      if (imageFile) {
        data.append("image", imageFile);
      }

      const url = editData
        ? `http://localhost:9005/api/updateTour/${editData._id}`
        : "http://localhost:9005/api/tourRegister";

      const response = await fetch(url, {
        method: editData ? "PUT" : "POST",
        // No headers needed for FormData, browser sets them
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        onSubmit(result.data);
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to save"}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Server is offline or unreachable.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const renderInput = (
    label,
    name,
    type = "text",
    placeholder = "",
    extraProps = {},
  ) => (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-1.5 text-slate-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
          errors[name]
            ? "border-red-500 bg-red-50"
            : "border-slate-200 bg-slate-50 focus:border-emerald-500"
        } ${extraProps.className || ""}`}
        {...extraProps}
      />
      {errors[name] && (
        <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-medium">
          <FaExclamationCircle size={10} /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 flex flex-col w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editData ? "Update Tour Package" : "Create New Tour"}
            </h2>
            <p className="text-[11px] text-slate-500">
              Submit tour details to the Mogadishu server.
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {renderInput(
                "Tour Title *",
                "title",
                "text",
                "e.g. Tropical Paradise",
              )}
              {renderInput(
                "City / Location *",
                "city",
                "text",
                "e.g. Liido Beach",
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <CustomSelect
                label="Country *"
                options={["Somalia", "Kenya", "Tanzania", "Ethiopia"]}
                value={formData.country}
                onChange={(val) => handleSelectChange("country", val)}
                error={errors.country}
              />
              <CustomSelect
                label="Category *"
                options={["Nature", "Beaches", "Forests", "Historical"]}
                value={formData.category}
                onChange={(val) => handleSelectChange("category", val)}
                error={errors.category}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {renderInput("Price (USD) *", "price", "number", "0.00")}
              {renderInput("Duration (Days) *", "Duration", "number", "1")}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {renderInput("Start Date *", "startDay", "date")}
              {renderInput("End Date (Calculated)", "endDay", "date", "", {
                readOnly: true,
                className: "bg-slate-100 cursor-not-allowed",
              })}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {renderInput("Max Guests *", "max_Gust", "number")}
              {renderInput("Available Spots *", "Available_Spots", "number")}
              <CustomSelect
                label="Status *"
                options={["Active", "Inactive"]}
                value={formData.status}
                onChange={(val) => handleSelectChange("status", val)}
              />
            </div>

            {/* Changed Image URL to File Upload while maintaining look */}
            <div className="w-full">
              <label className="block text-sm font-semibold mb-1.5 text-slate-700">
                Tour Image *
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className={`w-full px-3 py-4 border-2 border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center transition-all ${
                  errors.image
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 bg-slate-50 hover:border-emerald-500"
                }`}
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
              {errors.image && (
                <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-medium">
                  <FaExclamationCircle size={10} /> {errors.image}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Description *
              </label>
              <textarea
                name="desc"
                rows={3}
                value={formData.desc}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm border rounded-lg bg-slate-50 focus:outline-none ${errors.desc ? "border-red-500" : "border-slate-200 focus:border-emerald-500"}`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Highlights (One per line)
              </label>
              <textarea
                name="Highlights"
                rows={2}
                value={formData.Highlights}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50"
                placeholder="Free lunch&#10;Private guide"
              />
            </div>
          </div>

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
