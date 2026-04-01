import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tours from "./pages/Tours";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TourDetails from "./components/TourDetails ";
import AuthSuccess from "./pages/AuthSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layout/MainLayout";
import DivideDash from "./Dashbord/DivideDash";
import TourTable from "./Dashbord/Tour/TourTable";
import AddTour from "./Dashbord/Tour/AddTour";
import MyBookings from "./pages/MyBookings";
import AddBooking from "./pages/AddBooking";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/bookings/addBook" element={<AddBooking />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
        </Route>

        {/* No Navbar Pages (Auth & Dashboard) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-dash" element={<DivideDash />} />
        <Route path="/admin/dash/Tour" element={<TourTable />} />
        <Route path="/admin/dash/Tour/Add-tour" element={<AddTour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
