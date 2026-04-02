import { useState, useEffect } from "react";
import { FaTimes, FaExclamationCircle } from "react-icons/fa";
import CustomSelect from "../../components/ui/CustomSelect";

const AddTour = ({ isOpen, onClose, onSubmit, editData }) => {
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

  const [errors, setErrors] = useState({});

  // 1. Load/Reset Logic
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      if (editData) {
        setFormData({ ...editData, title: editData.title || editData.name || "" });
      } else {
        setFormData({
          title: "", location: "", country: "", category: "", price: "",
          duration: "", startDate: "", endDate: "", maxGuests: "15",
          availableSpots: "15", status: "Active", imageURL: "",
          description: "", highlights: "",
        });
      }
    }
  }, [editData, isOpen]);

  // 2. Automated Date Calculation
  useEffect(() => {
    if (formData.startDate && formData.duration) {
      const start = new Date(formData.startDate);
      const days = parseInt(formData.duration);
      if (!isNaN(start.getTime()) && days > 0) {
        const end = new Date(start);
        end.setDate(start.getDate() + days);
        const formattedEnd = end.toISOString().split("T")[0];
        if (formData.endDate !== formattedEnd) {
          setFormData(prev => ({ ...prev, endDate: formattedEnd }));
        }
      }
    }
  }, [formData.startDate, formData.duration]);

  // 3. Centralized Change Handler with Logic Guards
  const handleChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    // Numerical Logic Guards
    if (["price", "duration", "maxGuests", "availableSpots"].includes(name)) {
      const numValue = parseFloat(value);
      
      // Prevent overall negatives
      if (numValue < 0) validatedValue = "0";

      // RULE: Max Guests must be at least 1
      if (name === "maxGuests" && numValue < 1 && value !== "") {
        validatedValue = "1";
      }

      // RULE: Available Spots cannot exceed Max Guests
      if (name === "availableSpots") {
        const currentMax = parseInt(formData.maxGuests) || 1;
        if (numValue > currentMax) {
          validatedValue = currentMax.toString();
        }
      }
    }

    setFormData(prev => {
      const newState = { ...prev, [name]: validatedValue };
      
      // RULE: If Max Guests is lowered below current Available Spots, sync them
      if (name === "maxGuests") {
        const newMax = parseInt(validatedValue) || 1;
        if (parseInt(prev.availableSpots) > newMax) {
          newState.availableSpots = newMax.toString();
        }
      }
      return newState;
    });

    // Clear specific error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  // 4. Comprehensive Validation Logic
  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.country) newErrors.country = "Select a country";
    if (!formData.category) newErrors.category = "Select a category";
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    if (!formData.duration || parseInt(formData.duration) < 1) {
      newErrors.duration = "Duration must be at least 1 day";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    } else if (formData.startDate < today && !editData) {
      newErrors.startDate = "Date cannot be in the past";
    }

    if (!formData.maxGuests || parseInt(formData.maxGuests) < 1) {
      newErrors.maxGuests = "Min 1 guest required";
    }

    if (!formData.imageURL.includes("http")) {
      newErrors.imageURL = "Enter a valid image URL";
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description is too short";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  // Helper to render input with error styling
  const renderInput = (label, name, type = "text", placeholder = "", extraProps = {}) => (
    <div className="w-full">
      <label className="block text-sm font-semibold mb-1.5 text-slate-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg outline-none transition-all text-sm ${
          errors[name] 
            ? "border-red-500 bg-red-50 focus:ring-1 focus:ring-red-500" 
            : "border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex flex-col w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{editData ? "Update Tour Package" : "Create New Tour"}</h2>
            <p className="text-[11px] text-slate-500">Ensure all required fields marked with * are filled correctly.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="flex-1 px-6 py-5 space-y-5 overflow-y-auto bg-white">

            {/* Title & Location */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {renderInput("Tour Title *", "title", "text", "e.g. Tropical Paradise")}
              {renderInput("Location *", "location", "text", "e.g. Liido Beach")}
            </div>

            {/* Country & Category */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <CustomSelect
                label="Country *"
                options={["Somalia", "Kenya", "Tanzania", "Ethiopia", "Uganda", "Rwanda", "Djibouti", "South Sudan", "Eritrea", "Burundi"]}
                value={formData.country}
                onChange={(val) => handleSelectChange("country", val)}
                error={errors.country}
              />
              <CustomSelect
                label="Category *"
                options={["Nature", "Beaches", "Forests", "Farms", "Historical", "Restaurants"]}
                value={formData.category}
                onChange={(val) => handleSelectChange("category", val)}
                error={errors.category}
              />
            </div>

            {/* Price, Duration & Max Guests */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {renderInput("Price (USD) *", "price", "number", "0.00", { min: "1" })}
              {renderInput("Duration (Days) *", "duration", "number", "1", { min: "1" })}
              
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {renderInput("Start Date *", "startDate", "date")}
              {renderInput("End Date (Calculated)", "endDate", "date", "", {
                readOnly: true,
                className: "bg-slate-100 cursor-not-allowed"
              })}
            </div>

            {/* Available Spots & Status */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {renderInput("Max Guests *", "maxGuests", "number", "15", { min: "1" })}
              {renderInput("Available Spots *", "availableSpots", "number", "", { max: formData.maxGuests })}
              <CustomSelect
                label="Status *"
                options={["Active", "Inactive"]}
                value={formData.status}
                onChange={(val) => handleSelectChange("status", val)}
              />
            </div>

            {/* Image URL */}
            {renderInput("Featured Image URL *", "imageURL", "url", "https://example.com/image.jpg")}

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">Description *</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-slate-50 focus:outline-none transition-all ${
                  errors.description ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                }`}
              />
              {errors.description && <p className="text-red-500 text-[11px] mt-1">{errors.description}</p>}
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">Highlights (one per line)</label>
              <textarea
                name="highlights"
                rows={3}
                value={formData.highlights}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors rounded-lg"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-8 py-2 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-200"
            >
              {editData ? "Save Changes" : "Publish Tour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTour;