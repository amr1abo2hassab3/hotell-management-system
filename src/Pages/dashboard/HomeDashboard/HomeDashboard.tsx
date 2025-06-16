import { useContext, useEffect, useState } from "react";
import imgIcon from "../../../assets/images/homeimgdash.jpg";
import BoxHomeDashboard from "../../../Components/dashboard/BoxHomeDashboard/BoxHomeDashboard";
import { AuthContextProps } from "../../../interfaces/authTypes";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import ReservationTable from "../../../Components/dashboard/ReservationTable/ReservationTable";
import axios from "axios";
import {
  activeBookings,
  baseUrl,
  FutureBookings,
  monthlyEarnings,
  newMembers,
} from "../../../Api/Api";
import OccupancyRate from "../../../Components/dashboard/OccupancyRate/OccupancyRate";
import LoaderScreen from "../../../Components/website/LoaderScreen/LoaderScreen";

export interface HomeDashboardData {
  title: string;
  count: number;
  image: string;
  price?: number;
}

const HomeDashboard = () => {
  const { userData } = useContext<AuthContextProps>(AuthContext);
  const [data, setData] = useState<HomeDashboardData[]>(
    [] as HomeDashboardData[]
  );
  const [data2, setData2] = useState<HomeDashboardData[]>(
    [] as HomeDashboardData[]
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getActiveBooking = async (): Promise<{ activeBookings: number }> => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}${activeBookings}`);
      return { activeBookings: res.data.activeBookings };
    } catch (error) {
      console.log(error);
      return { activeBookings: 0 };
    } finally {
      setIsLoading(false);
    }
  };
  const getFutureBooking = async (): Promise<{ futureBookings: number }> => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}${FutureBookings}`);
      return { futureBookings: res.data.futureBookings };
    } catch (error) {
      console.log(error);
      return { futureBookings: 0 };
    } finally {
      setIsLoading(false);
    }
  };
  const getMonthlyEarnings = async (): Promise<{ monthlyEarnings: number }> => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}${monthlyEarnings}`);
      return { monthlyEarnings: res.data.monthlyEarnings };
    } catch (error) {
      console.log(error);
      return { monthlyEarnings: 0 };
    } finally {
      setIsLoading(false);
    }
  };
  const getNewMembers = async (): Promise<{ newMembers: number }> => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}${newMembers}`);
      return { newMembers: res.data.newMembers };
    } catch (error) {
      console.log(error);
      return { newMembers: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { activeBookings } = await getActiveBooking();
      const { futureBookings } = await getFutureBooking();
      const { monthlyEarnings } = await getMonthlyEarnings();
      const { newMembers } = await getNewMembers();
      setData([
        {
          title: "Active Bookings",
          count: activeBookings,
          image: imgIcon,
        },
        {
          title: "Future bookings",
          count: futureBookings,
          image: imgIcon,
        },
      ]);
      setData2([
        {
          title: "Monthly earnings",
          count: 0,
          price: monthlyEarnings,
          image: imgIcon,
        },
        {
          title: "New members",
          count: newMembers,
          image: imgIcon,
        },
      ]);
    };
    fetchData();
  }, []);

  if (isLoading) return <LoaderScreen />;
  return (
    <div className="p-[32px] flex flex-col gap-4">
      <div>
        {" "}
        <h2 className="text-[#202430] text-[24px] font-bold">
          Welcome {userData?.fullName ?? "Guest"} 👋
        </h2>
        <p className="text-[#ABADB7] text-[16px] font-bold">
          System Administrator
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-[18px]">
        <div className="flex flex-col gap-[14px]">
          {data.map((data: HomeDashboardData, index: number) => (
            <BoxHomeDashboard data={data} key={index} />
          ))}
        </div>
        <OccupancyRate />
        <div className="flex flex-col gap-[14px]">
          {data2.map((data: HomeDashboardData, index: number) => (
            <BoxHomeDashboard data={data} key={index} />
          ))}
        </div>
      </div>
      <div className=" shadow-md rounded-lg">
        <ReservationTable />
      </div>
    </div>
  );
};

export default HomeDashboard;
