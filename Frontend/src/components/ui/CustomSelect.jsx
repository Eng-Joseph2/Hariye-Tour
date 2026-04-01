import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-slate-800 mb-1.5">
          {label} {required && "*"}
        </label>
      )}

      {/* The visible trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
      >
        <span className="text-slate-900">{value || "Select an option"}</span>
        <FaChevronDown
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* The Figma styled dropdown panel */}
      {isOpen && (
        <div className="absolute left-0 z-30 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 max-h-60 overflow-y-auto animate-fade-in">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg text-left font-medium mb-1 last:mb-0 transition-colors hover:bg-slate-50 ${
                value === option
                  ? "bg-slate-50 text-slate-900"
                  : "text-slate-700"
              }`}
            >
              <span>{option}</span>
              {value === option && (
                <FaCheck className="text-slate-500 text-xs" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
