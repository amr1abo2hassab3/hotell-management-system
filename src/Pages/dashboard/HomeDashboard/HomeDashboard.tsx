import { useContext } from "react";
import imgIcon from "../../../assets/images/homeimgdash.jpg";
import BoxHomeDashboard from "../../../Components/dashboard/BoxHomeDashboard/BoxHomeDashboard";
import CurrentBookings from "../../../Components/dashboard/CurrentBookings/CurrentBookings";
import { AuthContextProps } from "../../../interfaces/authTypes";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

export interface HomeDashboardData {
  title: string;
  count: number;
  image: string;
  price?: number;
}

const data: HomeDashboardData[] = [
  {
    title: "Active Bookings",
    count: 24,
    image: imgIcon,
  },
  {
    title: "Future bookings",
    count: 18,
    image: imgIcon,
  },
];

const HomeDashboard = () => {
  const { userData } = useContext<AuthContextProps>(AuthContext);

  return (
    <div className="p-[32px] flex flex-col gap-4">
      <div>
        {" "}
        <h2 className="text-[#202430] text-[24px] font-bold">
          Welcome {userData?.fullName && userData.fullName} 👋
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
      </div>
      <CurrentBookings />
    </div>
  );
};

export default HomeDashboard;
