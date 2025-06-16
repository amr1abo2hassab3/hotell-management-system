import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";
import { useContext } from "react";
import { AuthContextProps } from "../../../interfaces/authTypes";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

interface LinksDashboardType {
  label: string;
  icon: string;
  to: string;
}

const LinksDashboard: LinksDashboardType[] = [
  { label: "Home", icon: "fa-house", to: "/dashboard" },
  {
    label: "Manage reservations",
    icon: "fa-bars-progress",
    to: "/dashboard/reservations",
  },
  {
    label: "Room management",
    icon: "fa-bed",
    to: "/dashboard/rooms",
  },
  {
    label: "Service Management",
    icon: "fa-list-check",
    to: "/dashboard/services",
  },
  {
    label: "User Management",
    icon: "fa-user",
    to: "/dashboard/users",
  },
];

interface SideBarDashboardProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const SideBarDashboard = ({ setIsOpen, isOpen }: SideBarDashboardProps) => {
  const { userData } = useContext<AuthContextProps>(AuthContext);
  const location = useLocation();

  return (
    <>
      {/* خلفية سوداء عند فتح السايدبار */}
      {isOpen && (
        <div
          className="fixed inset-0 min-h-screen bg-black bg-opacity-50 z-40 "
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed z-50 top-0 left-0 min-h-screen overflow-y-auto w-[300px] bg-[#EDE6DD] px-5 py-8 transform transition-all duration-300 ease-out
    ${
      isOpen
        ? "translate-x-0 opacity-100 scale-100"
        : "-translate-x-full opacity-0 scale-95"
    } 
   `}
      >
        {/* زر إغلاق على الموبايل */}
        <div className="flex justify-end ">
          <button
            className="text-[#7C8493] mb-4"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center">
              <img
                className="w-[80px] h-[80px] md:w-[102px] md:h-[102px]"
                src={logo}
                alt="logo"
              />
            </div>

            <ul className="flex flex-col">
              {LinksDashboard.map((item) => (
                <li className="my-1" key={item.label}>
                  <Link
                    to={item.to}
                    className={`p-4 flex rounded items-center gap-2 cursor-pointer text-[18px] capitalize transition-all duration-300
    ${
      location.pathname === item.to
        ? "bg-[#C4A484] text-[#8B6B4E]"
        : "text-[#7C8493] hover:bg-[#C4A484] hover:text-[#8B6B4E]"
    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 mt-auto py-5 bottom-0 absolute bg-[#EDE6DD]">
            <div className="w-[48px] h-[48px] rounded-full overflow-hidden ">
              <img src={logo} className="w-full h-full object-cover" alt="" />
            </div>
            <div>
              <h2 className="capitalize text-[16px] text-[#202430] font-bold">
                {(userData?.fullName && userData?.fullName) || "user"}
              </h2>
              <h3 className="text-[12px] text-[#51586F]">
                {(userData?.email && userData?.email) || "admin@gmail.com"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarDashboard;
