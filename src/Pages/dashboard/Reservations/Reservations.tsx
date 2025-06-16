import imgIcon from "../../../assets/images/homeimgdash.jpg";

import { useEffect, useState } from "react";
import ReservationTable from "../../../Components/dashboard/ReservationTable/ReservationTable";
import BoxHomeDashboard from "../../../Components/dashboard/BoxHomeDashboard/BoxHomeDashboard";
import AddNewBooking from "../../../Components/dashboard/AddNewBooking/AddNewBooking";
import axios from "axios";
import { baseUrl, daily_stats_Booking } from "../../../Api/Api";

export interface HomeDashboardData {
  title: string;
  count: number;
  image: string;
  price?: number;
}

async function getDaily_stats_Booking(): Promise<{
  totalBookingsToday: number;
  cancelledBookingsToday: number;
}> {
  try {
    const res = await axios.get(`${baseUrl}${daily_stats_Booking}`);
    return {
      totalBookingsToday: res.data?.totalBookingsToday,
      cancelledBookingsToday: res.data?.cancelledBookingsToday,
    };
  } catch (error) {
    console.log(error);
    return {
      totalBookingsToday: 0,
      cancelledBookingsToday: 0,
    };
  }
}

const Reservations = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<HomeDashboardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { cancelledBookingsToday, totalBookingsToday } =
        await getDaily_stats_Booking();
      setData([
        {
          title: "Total bookings today",
          count: totalBookingsToday,
          image: imgIcon,
        },
        {
          title: "Number of cancelled reservations",
          count: cancelledBookingsToday,
          image: imgIcon,
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="md:p-[32px] flex flex-col gap-4">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[#202430] text-[24px] font-bold capitalize">
            Reservations
          </h1>
          <p className="text-[#ABADB7] text-[16px] font-bold">
            The reservation management page allows the manager to view and
            manage all current and past reservations, with the ability to
            search, modify, or cancel according to the hotel's policy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-[18px]">
          {data.map((data: HomeDashboardData, index: number) => (
            <BoxHomeDashboard data={data} key={index} />
          ))}
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="w-[264px] h-[48px] bg-[#2C3E50] rounded-[16px] text-[18px] font-medium text-white"
          >
            Add new Booking
          </button>
        </div>

        {isOpen && <AddNewBooking setIsOpen={setIsOpen} isOpen={isOpen} />}
      </div>
      <div className=" shadow-md rounded-lg">
        <ReservationTable />
      </div>
    </div>
  );
};

export default Reservations;
