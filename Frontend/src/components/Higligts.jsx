import React from "react";

function Highlights() {
  const highlightList = [
    "Game drives with experienced guides",
    "Witness the great wildebeest migration",
    "Luxury tented accommodation",
    "All meals included",
    "Airport transfers",
  ];

  const infoList = [
    { label: "Minimum age requirement", value: "12 years" },
    { label: "Maximum group size", value: "15 people" },
    {
      label: "Cancellation policy",
      value: "Free cancellation up to 7 days before start date",
    },
    { label: "Physical fitness level", value: "Moderate" },
  ];

  return (
    <div className="max-w-4xl p-6 font-sans text-[#1e293b]">
      {/* Tour Highlights Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Tour Highlights</h2>
        <ul className="space-y-4">
          {highlightList.map((text, index) => (
            <li key={index} className="flex items-center gap-3">
              {/* Emerald Checkmark Icon */}
              <svg
                className="w-5 h-5 text-emerald-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[17px] text-slate-600">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Important Information Box */}
      <div className="bg-[#e9f7f2] rounded-lg p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4">Important Information</h3>
        <ul className="space-y-3">
          {infoList.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              {/* Small Bullet Point */}
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
              <p className="text-slate-600 leading-tight">
                <span className="font-semibold">{item.label}:</span>{" "}
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Highlights;
