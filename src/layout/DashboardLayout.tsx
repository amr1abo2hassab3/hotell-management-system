import { Outlet } from "react-router-dom";
import SideBarDashboard from "../Components/dashboard/SideBarDashboard/SideBarDashboard";
import NavBarDashboard from "../Components/dashboard/NavBarDashboard/NavBarDashboard";
import { useState } from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen">
      <SideBarDashboard isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 p-4 bg-gray-100  ml-0 ">
        <NavBarDashboard setIsOpen={setIsOpen} />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
