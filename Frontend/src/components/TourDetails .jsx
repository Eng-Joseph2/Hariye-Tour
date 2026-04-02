import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaRegClock,
  FaCalendarAlt,
  FaCheck,
  FaUsers,
  FaChild,
} from "react-icons/fa";
import Highlights from "./Higligts";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9005/api/readSingleTour/${id}`)
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

  const handleBooking = () => {
    if (!tour) return;

    // 1. Soo qaado liiskii hore u yaallay (haddii uu jiro)
    const existingBookings = JSON.parse(
      localStorage.getItem("allBookings") || "[]",
    );

    // 2. HUBI: Ma ku jiraa safarkan (ID-giisa) liiska hadda jira?
    // Waxaan isticmaaleynaa .some() si aan u ogaano haddii uu jiro ID isku mid ah
    const isAlreadyBooked = existingBookings.some(
      (item) => item.tourId === (tour._id || id),
    );

    if (isAlreadyBooked) {
      // Haddii uu horay u jiray, qofka u sheeg oo u gudbi bogga bookings-ka
      alert("Safarkan horay ayaad u ballansatay!");

      navigate("/bookings");
      return; // Halkan ku jooji
    }

    // 3. Haddii uusan horay u jirin, diyaari xogta cusub
    const newBooking = {
      tourId: tour._id || id,
      title: tour.title,
      price: tour.price,
      image: tour.image,
      location: tour.location || `${tour.city}, ${tour.country}`,
      bookedAt: new Date().toISOString(),
    };

    // 4. Ku dar liiska cusub ka dibna kaydi
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("allBookings", JSON.stringify(updatedBookings));
    alert("sucess Booking");
    navigate("/bookings");
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
          className="text-gray-600 hover:text-emerald-600 mb-6 flex items-center"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Image */}
          <div className="relative h-[400px]">
            <img
              src={`http://localhost:9005/images/${tour.image}`}
              className="w-full h-full object-cover"
              alt={tour.title}
            />
            <div className="absolute top-6 right-6 bg-white px-5 py-2 rounded-full shadow-xl font-bold text-emerald-600 text-xl">
              ${tour.price}
            </div>
          </div>

          <div className="p-10">
            {/* Title & Location */}
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
              {tour.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-slate-500 mb-8">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-emerald-500" />
                {tour.city}, {tour.country}{" "}
              </span>
              <span className="flex items-center gap-2">
                <FaRegClock className="text-emerald-500" />
                {tour.Duration || tour.days} days
              </span>
            </div>

            {/* Important Info Grid (Xogta Inta badan Maqan) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">
                  Start Date
                </p>
                <p className="font-medium">
                  {tour.startDay
                    ? new Date(tour.startDay).toLocaleDateString()
                    : "TBA"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">
                  End Date
                </p>
                <p className="font-medium">
                  {tour.endDay
                    ? new Date(tour.endDay).toLocaleDateString()
                    : "TBA"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">
                  Max Guests
                </p>
                <p className="font-medium flex items-center gap-1">
                  <FaUsers /> {tour.max_Gust || tour.maxGuests || "10"}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">
                  Available Spots
                </p>
                <p className="font-medium">
                  {tour.Available_Spots || "Available"}
                </p>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-2xl mb-3">About this Tour</h1>
              <p className="text-slate-600 leading-relaxed text-lg mb-10">
                {tour.desc || tour.description}
              </p>
            </div>
            <div>
              <Highlights />
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg transition-all"
            >
              Book This Tour Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
