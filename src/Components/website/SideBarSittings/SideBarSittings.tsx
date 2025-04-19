import { NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

interface LinksSittingsType {
  label: string;
  icon: string;
  to: string;
}

const LinksSittings: LinksSittingsType[] = [
  { label: "Saved rooms", icon: "fa-heart", to: "/sittings" },
];

interface SideBarSittingsProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const SideBarSittings = ({ setIsOpen, isOpen }: SideBarSittingsProps) => {
  const location = useLocation();
  const { userData } = useContext(AuthContext);

  return (
    <>
      {/* خلفية سوداء عند فتح السايدبار */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed z-50 top-0 left-0 min-h-screen w-[300px] bg-[#EDE6DD] px-5 py-8 transform transition-all duration-300 ease-out
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

        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col  gap-5">
            <div className="flex items-center justify-center">
              <img
                className="w-[124px] h-[124px] md:w-[102px] md:h-[102px] rounded-full"
                src={logo}
                alt="logo"
              />
            </div>
            <h2 className="text-center font-semibold text-[#202430] text-[24px]">
              {userData?.fullName}
            </h2>

            <ul className="flex flex-col">
              {LinksSittings.map((item) => (
                <li className="my-1" key={item.label}>
                  <NavLink
                    to={item.to}
                    className={`p-4 flex items-center gap-2 cursor-pointer text-[18px] capitalize transition-all duration-300
    ${
      location.pathname === item.to
        ? "bg-[#C4A484] text-[#8B6B4E]"
        : "text-[#7C8493] hover:bg-[#C4A484] hover:text-[#8B6B4E]"
    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarSittings;
