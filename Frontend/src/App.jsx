import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

// Components & Pages
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TourDetails from "./components/TourDetails";
import AuthSuccess from "./pages/AuthSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layout/MainLayout";
import DivideDash from "./Dashbord/DivideDash";
import TourTable from "./Dashbord/Tour/TourTable";
import AddTour from "./Dashbord/Tour/AddTour";
import MyBookings from "./pages/MyBookings";
import AddBooking from "./pages/AddBooking";
import DashbordLogin from "./pages/DashbordLogin";
import BookingTable from "./Dashbord/Booking/BookingTable";
import CustomerTable from "./pages/CustomerTable";
import Ticket from "./pages/Ticket";
import VerifyTicket from "./pages/VerifyTicket";
import Setting from "./Dashbord/setting";

// --- 1. PROTECTED ROUTE COMPONENT ---
const AdminProtectedRoute = ({ user }) => {
  // If no user or the role is not Admin/SuperAdmin, send to login
  if (!user || (user.role !== "Admin" && user.role !== "SuperAdmin")) {
    return <Navigate to="/login" replace />;
  }
  // If admin, allow them to see the page (Outlet)
  return <Outlet />;
};

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved && saved !== "undefined" ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("LocalStorage Parse Error:", error);
      return null;
    }
  });

  useEffect(() => {
    const checkUser = () => {
      try {
        const saved = localStorage.getItem("user");
        const parsedUser = saved && saved !== "undefined" ? JSON.parse(saved) : null;
        setUser(parsedUser);
      } catch (error) {
        setUser(null);
      }
    };

    window.addEventListener("userLogin", checkUser);
    window.addEventListener("storage", checkUser); // Also listen for storage changes
    return () => {
      window.removeEventListener("userLogin", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* --- MAIN PAGES (WITH NAVBAR/LAYOUT) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/bookings/addBook" element={<AddBooking />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/ticket/:id" element={<Ticket />} />
        </Route>

        {/* --- AUTH ROUTES --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/admin/login" element={<DashbordLogin />} />

        {/* --- PROTECTED ADMIN ROUTES --- */}
        <Route element={<AdminProtectedRoute user={user} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-dash" element={<DivideDash />} />
          <Route path="/admin/dash/Tour" element={<TourTable />} />
          <Route path="/admin/dash/Tour/Add-tour" element={<AddTour />} />
          <Route path="/admin/dash/BookingTable" element={<BookingTable />} />
          <Route path="/admin/settings" element={<Setting />} />
          <Route path="/admin/customers" element={<CustomerTable />} />
          <Route path="/admin/verify-ticket/:id" element={<VerifyTicket />} />
        </Route>

        {/* --- 404 OR REDIRECT --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;