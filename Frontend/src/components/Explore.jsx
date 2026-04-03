import { Link } from "react-router-dom";
import { FaUmbrellaBeach, FaLandmark, FaSeedling } from "react-icons/fa";
import { GiForestCamp, GiWheat } from "react-icons/gi";
import { MdRestaurant } from "react-icons/md";

const GradientIcon = ({ Icon, id, from, to, size = 40 }) => {
  return (
    <div className="relative">
      <svg width="0" height="0">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
      </svg>

      <Icon
        size={size}
        style={{ fill: `url(#${id})` }}
        className="transition-transform duration-500 group-hover:scale-125"
      />
    </div>
  );
};

const categories = [
  {
    name: "Nature",
    icon: FaSeedling,
    colors: ["#22c55e", "#059669"],
    url: "/tours",
  },
  {
    name: "Beaches",
    icon: FaUmbrellaBeach,
    colors: ["#38bdf8", "#06b6d4"],
    url: "/tours",
  },
  {
    name: "Forests",
    icon: GiForestCamp,
    colors: ["#84cc16", "#16a34a"],
    url: "/tours",
  },
  {
    name: "Farms",
    icon: GiWheat,
    colors: ["#facc15", "#f97316"],
    url: "/tours",
  },
  {
    name: "Historical",
    icon: FaLandmark,
    colors: ["#9ca3af", "#374151"],
    url: "/tours",
  },
  {
    name: "Restaurants",
    icon: MdRestaurant,
    colors: ["#f472b6", "#ef4444"],
    url: "/tours",
  },
];

export default function ExploreCategories() {
  return (
    <section className="bg-gray-100 py-20">
      <h2 className="text-3xl text-center mb-12 font-semibold">
        Explore by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-[80%] mx-auto">
        {categories.map((cat, index) => {
          const Icon = cat.icon;

          return (
            <Link to={cat.url} key={index}>
              <div className="flex flex-col items-center p-6 rounded-xl shadow-md bg-gradient-to-br from-emerald-50 to-blue-50 hover:from-emerald-100 hover:to-blue-100 transition-all hover:shadow-lg cursor-pointer">
                <GradientIcon
                  Icon={Icon}
                  id={`grad-${index}`}
                  from={cat.colors[0]}
                  to={cat.colors[1]}
                />

                <p className="mt-3 text-gray-700 group-hover:text-black">
                  {cat.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
