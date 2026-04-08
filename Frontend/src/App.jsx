import { Routes, Route, Navigate } from "react-router-dom";

// Components & Pages
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./components/TourDetails";
import MainLayout from "./layout/MainLayout";
import MyBookings from "./pages/MyBookings";
import AddBooking from "./pages/AddBooking";
import Ticket from "./pages/Ticket";
import VerifyTicket from "./pages/VerifyTicket";
import DivideDash from "./Dashbord/DivideDash";
import TourTable from "./Dashbord/Tour/TourTable";
import AddTour from "./Dashbord/Tour/AddTour";
import BookingTable from "./Dashbord/Booking/BookingTable";
import AcceptedBookingsTable from "./Dashbord/AcceptedBookingsTable";
import CustomerTable from "./pages/CustomerTable";
import Setting from "./Dashbord/setting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import LoginSuccess from "./pages/LoginSuccess";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* --- MAIN PAGES (WITH NAVBAR/LAYOUT) --- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/addBook"
          element={
            <ProtectedRoute>
              <AddBooking />
            </ProtectedRoute>
          }
        />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route
          path="/ticket/:id"
          element={
            <ProtectedRoute>
              <Ticket />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/admin-dash"
        element={
          <AdminRoute>
            <DivideDash />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dash/Tour"
        element={
          <AdminRoute>
            <TourTable />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dash/Tour/Add-tour"
        element={
          <AdminRoute>
            <AddTour />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dash/BookingTable"
        element={
          <AdminRoute>
            <BookingTable />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/requests"
        element={
          <AdminRoute>
            <AcceptedBookingsTable />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <Setting />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/customers"
        element={
          <AdminRoute>
            <CustomerTable />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/verify-ticket/:id"
        element={
          <AdminRoute>
            <VerifyTicket />
          </AdminRoute>
        }
      />
      <Route path="/login-success" element={<LoginSuccess />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;