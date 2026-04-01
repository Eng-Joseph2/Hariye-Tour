import React from "react";
import { AiOutlineGlobal } from "react-icons/ai";

const features = [
  {
    title: "Local Expertise",
    description:
      "Our guides are local experts who know every hidden gem and share authentic stories.",
    icon: <AiOutlineGlobal size={40} className="text-blue-500" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Curated Experiences",
    description:
      "Every tour is carefully designed to give you the best of East African culture and nature.",
    icon: "✨",
    bgColor: "bg-blue-50",
  },
  {
    title: "Safe & Secure",
    description:
      "Your safety is our priority. All tours include insurance and experienced guides.",
    icon: "🛡️",
    bgColor: "bg-yellow-100",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-16">
          Why Choose Us
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Icon Wrapper */}
              <div
                className={`text-4xl flex items-center justify-center w-20 h-20 rounded-full ${item.bgColor} mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
