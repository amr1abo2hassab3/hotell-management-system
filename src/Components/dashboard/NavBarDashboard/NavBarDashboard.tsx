import { useState } from "react";
import useHandleLogOut from "../../../customHooks/useHandleLogOut";
import { Link, useLocation } from "react-router-dom";

interface NavBarDashboardProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarDashboard = ({ setIsOpen }: NavBarDashboardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogOut = useHandleLogOut();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard/services":
        return "Service Management";
      case "/dashboard/users":
        return "User Management";
      case "/dashboard/rooms":
        return "Room management";
      case "/dashboard/reservations":
        return "Manage reservations";
      default:
        return "Home";
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center gap-3">
        {/* زر فتح السايدبار على الشاشات الكبيرة */}
        <button
          className="bg-[#C4A484] text-white p-2 rounded"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-right-from-bracket"></i>{" "}
        </button>

        <h2 className="text-lg font-semibold text-[24px]">{getPageTitle()}</h2>
      </div>

      {/* زر القائمة للموبايل */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fa-solid fa-bars text-2xl text-mainColor"></i>
        </button>
      </div>

      {/* القائمة في الشاشات الكبيرة */}
      <div className="hidden md:flex items-center space-x-3">
        <Link
          to="/"
          className="font-medium border text-[#986d3c] border-[#986d3c] px-4 py-2 rounded text-sm capitalize"
        >
          go to website
        </Link>

        <button
          onClick={handleLogOut}
          className="bg-mainColor text-white px-4 py-2 rounded text-sm"
        >
          Log out
        </button>
      </div>

      {/* القائمة المنسدلة للموبايل */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 space-y-3 z-50 w-60 md:hidden">
          <Link
            to="/"
            className="block font-medium text-[#986d3c] border-[1px] text-center p-2 border-gray-200"
          >
            go to website
          </Link>
          <button
            onClick={handleLogOut}
            className="w-full bg-mainColor text-white px-4 py-2 rounded text-sm"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBarDashboard;
