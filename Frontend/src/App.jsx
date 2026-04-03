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
  // Hubi haddii qofku login yahay si aan u go'aamino bogga koowaad
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const checkUser = () => {
      const saved = localStorage.getItem("user");
      console.log(user);
      setUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener("userLogin", checkUser);
    return () => window.removeEventListener("userLogin", checkUser);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* --- DYNAMIC ROOT ROUTE --- */}
        {/* Haddii uu jiro user, tuso Home (MainLayout gudahiisa). Haddii kale, tuso Login. */}
        {/* <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Login />}
        /> */}

        {/* --- MAIN PAGES (WITH NAVBAR) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/bookings/addBook" element={<AddBooking />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/ticket/:id" element={<Ticket />} />
        </Route>

        {/* --- AUTH & ADMIN (NO NAVBAR) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/admin/login" element={<DashbordLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-dash" element={<DivideDash />} />
        <Route path="/admin/dash/Tour" element={<TourTable />} />
        <Route path="/admin/dash/Tour/Add-tour" element={<AddTour />} />
        <Route path="/admin/dash/BookingTable" element={<BookingTable />} />
        <Route path="/admin/settings" element={<Setting />} />
        <Route path="/admin/customers" element={<CustomerTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
