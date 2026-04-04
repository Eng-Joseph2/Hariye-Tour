import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
import Setting from "./Dashbord/Setting";
import CustomerTable from "./pages/CustomerTable";
import Ticket from "./pages/Ticket";

const App = () => {
  // 1. Hubi user-ka si ammaan ah (Safe JSON parsing)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      // Kaliya parse garee haddii xogtu tahay JSON sax ah, haddii kale null
      return saved && saved !== "undefined" ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("LocalStorage Parse Error:", error);
      return null;
    }
  });

  // 2. Dhagayso dhacdada "userLogin" si App-ka loo cusboonaysiiyo
  useEffect(() => {
    const checkUser = () => {
      try {
        const saved = localStorage.getItem("user");
        const parsedUser =
          saved && saved !== "undefined" ? JSON.parse(saved) : null;
        setUser(parsedUser);
      } catch (error) {
        setUser(null);
        console.log(error);
      }
    };

    window.addEventListener("userLogin", checkUser);
    return () => window.removeEventListener("userLogin", checkUser);
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

        {/* --- ADMIN ROUTES (NO NAVBAR) --- */}
        <Route path="/admin/login" element={<DashbordLogin />} />

        {/* Dashboard Pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-dash" element={<DivideDash />} />
        <Route path="/admin/dash/Tour" element={<TourTable />} />
        <Route path="/admin/dash/Tour/Add-tour" element={<AddTour />} />
        <Route path="/admin/dash/BookingTable" element={<BookingTable />} />
        <Route path="/admin/settings" element={<Setting />} />
        <Route path="/admin/customers" element={<CustomerTable />} />

        {/* --- 404 OR REDIRECT --- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
