import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBarSittings from "./../../../Components/website/SideBarSittings/SideBarSittings";

const Sittings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen">
      <SideBarSittings isOpen={isOpen} setIsOpen={setIsOpen} />
      <button
        className="bg-[#C4A484] text-white p-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        <i className="fa-solid fa-right-from-bracket"></i>{" "}
      </button>
      <main className="flex-1 p-4 bg-gray-100  ml-0 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Sittings;
