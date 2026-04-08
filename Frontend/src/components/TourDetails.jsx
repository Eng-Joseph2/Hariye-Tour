import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaRegClock, FaUsers } from "react-icons/fa";
import Highlights from "./Higligts";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Core States
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "Male",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://hariye-tour-agency-u7bh.onrender.com/api/readSingleTour/${id}`)
        .then((res) => {
          setTour(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("API Error:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ CHECK IF TOUR IS BOOKABLE
  const isBookable = tour?.status === "upcoming" && tour?.Available_Spots > 0;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!tour) return;

    // Client-side validation
    if (!userData.name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!userData.email.trim()) {
      alert("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!userData.gender) {
      alert("Please select your gender");
      return;
    }

    // ✅ EXTRA SAFETY CHECK
    if (!isBookable) {
      alert(`Sorry, this tour is ${tour.status} and cannot be booked`);
      return;
    }

    try {
      // ✅ BACKEND CALL
      const response = await axios.post(
        "https://hariye-tour-agency-u7bh.onrender.com/api/bookingRegister",
        {
          full_name: userData.name.trim(),
          email: userData.email.trim(),
          gender: userData.gender,
          tourId: tour._id || id,
        },
      );

      // Update local storage for offline access
      const existingBookings = JSON.parse(
        localStorage.getItem("allBookings") || "[]",
      );

      const newLocalBooking = {
        ...userData,
        tourId: tour._id || id,
        bookedBy: userData.email,
        title: tour.title,
        price: tour.price,
        image: tour.image,
        location: `${tour.city}, ${tour.country}`,
        bookedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "allBookings",
        JSON.stringify([...existingBookings, newLocalBooking]),
      );

      // ✅ REAL-TIME UPDATE TOUR DATA
      const updatedTour = await axios.get(
        `https://hariye-tour-agency-u7bh.onrender.com/api/readSingleTour/${id}`,
      );
      setTour(updatedTour.data.data);

      alert("Success! Your booking has been confirmed.");
      navigate("/bookings");
    } catch (err) {
      console.error("Booking Error:", err);

      // Handle different types of errors
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Booking failed: ${err.response.data.message}`);
      } else if (err.response && err.response.status === 400) {
        alert("Invalid booking data. Please check your information and try again.");
      } else if (err.response && err.response.status === 404) {
        alert("Tour not found. Please refresh the page and try again.");
      } else {
        alert("An error occurred during booking. Please try again later.");
      }
    }
  };

  if (loading)
    return <div className="text-center py-20 font-sans">Loading...</div>;
  if (!tour)
    return (
      <div className="text-center py-20 text-red-500">Tour not found.</div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 pt-32">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-emerald-600 mb-6 flex items-center transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="relative h-[400px]">
            <img
              src={`https://hariye-tour-agency-u7bh.onrender.com/images/${tour.image}`}
              className="w-full h-full object-cover"
              alt={tour.title}
            />
            <div className="absolute top-6 right-6 bg-white px-5 py-2 rounded-full shadow-xl font-bold text-emerald-600 text-xl">
              ${tour.price}
            </div>
            {tour.Available_Spots === 0 && (
              <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full shadow-xl font-bold text-sm">
                FULLY BOOKED
              </div>
            )}
            <div className={`absolute bottom-6 left-6 px-4 py-2 rounded-full shadow-xl font-bold text-sm ${
              tour.status === 'upcoming' ? 'bg-green-100 text-green-800' :
              tour.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
              tour.status === 'completed' ? 'bg-gray-100 text-gray-800' :
              'bg-red-100 text-red-800'
            }`}>
              {tour.status?.toUpperCase()}
            </div>
          </div>

          <div className="p-10">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
              {tour.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-slate-500 mb-8">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-500" />
                {tour.city}, {tour.country}
              </span>
              <span className="flex items-center gap-2">
                <FaRegClock className="text-emerald-500" />
                {tour.Duration || tour.days} days
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">
                  Max Guests
                </p>
                <p className="font-medium flex items-center gap-1">
                  <FaUsers /> {tour.max_Gust || "10"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">
                  Available Spots
                </p>
                <p className={`font-medium ${tour.Available_Spots === 0 ? 'text-red-600 font-bold' : ''}`}>
                  {tour.Available_Spots === 0 ? 'FULLY BOOKED' : tour.Available_Spots}
                </p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="font-semibold text-2xl mb-3">About this Tour</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {tour.desc || tour.description}
              </p>
            </div>

            <div className="mb-12">
              <Highlights />
            </div>

            {/* ✅ SHOW MESSAGE IF NOT BOOKABLE */}
            {!isBookable && (
              <div className="mb-6 text-center text-red-500 font-semibold">
                {tour?.Available_Spots === 0
                  ? "Sorry, this tour is fully booked"
                  : `Sorry, this tour is ${tour.status} and cannot be booked`
                }
              </div>
            )}

            {!showForm && isBookable ? (
              <button
                onClick={() => setShowForm(true)}
                disabled={!isBookable}
                className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${
                  !isBookable
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {!isBookable
                  ? (tour?.Available_Spots === 0 ? "Fully Booked" : `Tour ${tour.status}`)
                  : "Book This Tour Now"
                }
              </button>
            ) : (
              isBookable && (
                <form
                  onSubmit={handleBookingSubmit}
                  className="bg-slate-50 p-8 rounded-3xl border-2 border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <h3 className="text-2xl font-bold mb-6 text-slate-800">
                    Your Details
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">
                        Full Name
                      </label>
                      <input
                        required
                        name="name"
                        type="text"
                        className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-white"
                        placeholder="Enter your full name"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">
                        Email Address
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-white"
                        placeholder="example@email.com"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 bg-white"
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 bg-white border border-slate-200 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="flex-[2] bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 shadow-md transition-all"
                      >
                        Confirm & Pay
                      </button>
                    </div>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
