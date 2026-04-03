import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={img} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          Explore East Africa
        </h1>

        <p className="text-sm sm:text-base md:text-lg max-w-xl mb-6">
          Discover breathtaking landscapes, rich cultures, and unforgettable
          adventures across Somalia, Kenya, Ethiopia, Tanzania, and More.
        </p>

        {/* Search */}
        <div className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden w-full max-w-xl">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-3 text-black outline-none"
          />
          <button className="bg-gradient-to-r from-[#22c55e] to-[#059669] text-white px-6 py-3 cursor-pointer">
            Search
          </button>
        </div>
      </div>

      {/* Arrows (hidden on small screens) */}
      <button
        onClick={() =>
          setCurrent(current === 0 ? images.length - 1 : current - 1)
        }
        className="hidden cursor-pointer md:block absolute left-5 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 max-lg:p-2"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="hidden cursor-pointer md:block absolute right-5 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 max-lg:p-2"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-5 h-1 md:w-6 md:h-1 sm:w-7 sm:h-2 cursor-pointer ${
              current === index
                ? "bg-green-400 border-b-1 border-white"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
