import { Link, useLocation } from "react-router-dom"; // Import these
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  ClipboardList,
  Users,
  Compass,
  Star,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarLinks = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin-dash",
  },
  { name: "Manage Tours", icon: <Map size={20} />, path: "/admin/dash/Tour" },
  {
    name: "Bookings",
    icon: <CalendarCheck size={20} />,
    path: "/admin/dash/BookingTable",
  },
  {
    name: "Accepted Bookings",
    icon: <ClipboardList size={20} />,
    path: "/admin/requests",
  },
  { name: "Customers", icon: <Users size={20} />, path: "/admin/customers" },
  {
    name: "Destinations",
    icon: <Compass size={20} />,
    path: "/admin/destinations",
  },
  { name: "Reviews", icon: <Star size={20} />, path: "/admin/reviews" },
  { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
];

function SideBar() {
  const location = useLocation(); // This determines the current page location

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] justify-between px-3 pb-12">
      <nav className="space-y-1">
        {sidebarLinks.map((link, index) => {
          const isActive = location.pathname === link.path; // Hubi haddii link-gu uu yahay kan hadda la joogo

          return (
            <Link
              key={index}
              to={link.path}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span
                className={
                  isActive
                    ? "text-white"
                    : "group-hover:text-emerald-400 transition-colors"
                }
              >
                {link.icon}
              </span>
              <span className="hidden lg:block font-medium text-[14px]">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Dashboard Home Button */}
      <div className="pt-4 border-t border-slate-800">
        <Link to="/admin-dash">
          <button className="w-full flex items-center gap-3 px-3 py-3 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all group">
            <LogOut
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="hidden lg:block font-medium text-[14px]">
              Dashboard Home
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
