import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminAvatar from "./AdminAvatar";
import UserCard from "./UserCard";
import axios from "axios";
import BoysAndGirlsChart from "../charts/BoysAndGirlsChart";
import DaysCharts from "../charts/DaysCharts";
import MonthlyCharts from "../charts/MounthlyCharts";
import DayAndDate from "./DayAndDate";
import Calender from "./Calender";

function DivideDash() {
  const [data, setData] = useState([]);
  const [Auths, setAuth] = useState([]);
  const [Booking, setBooking] = useState([]);

  const HandalReadTour = () => {
    axios
      .get("http://localhost:9005/api/readAllTour")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => console.log(error));
  };
  const HandalAuthTour = () => {
    axios
      .get("http://localhost:9005/api/readAuth")
      .then((res) => {
        console.log(res.data);
        setAuth(res.data.data);
      })
      .catch((error) => console.log("Auth Fetch Error:", error));
  };
  const HandalReadBooking = () => {
    axios
      .get("http://localhost:9005/api/readBooking")
      .then((res) => {
        // FIXED: Accessing res.data.data to match your controller
        setBooking(res.data.data || []);
      })
      .catch((error) => console.log("Booking Fetch Error:", error));
  };

  useEffect(() => {
    HandalReadTour();
    HandalAuthTour();
    HandalReadBooking(); // Added this missing call
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="w-[14%] md:w-[8%] lg:w-[18%] xl:w-[15%] bg-[#0f172a] border-r border-slate-800 h-screen sticky top-0">
        <Menu />
      </div>
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <AdminAvatar />
        </div>
        <div className="p-4 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <UserCard bg="bg-emerald-600" count={data.length} title="Tours" />
              <UserCard
                bg="bg-slate-800"
                count={Booking.length}
                title="Bookings"
              />
              <UserCard
                bg="bg-emerald-600"
                count={Auths.length}
                title="Customers"
              />
              <UserCard bg="bg-slate-800" count="1,323" title="Requests" />
            </div>
            <div className="flex space-x-3">
              <BoysAndGirlsChart />
              <DaysCharts />
            </div>
            <div>
              <MonthlyCharts />
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            <div className="mt-10">
              <div>
                <DayAndDate />
                <Calender />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DivideDash;
