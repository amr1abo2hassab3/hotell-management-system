import { useState } from "react";
import RoomsTables from "../../../Components/dashboard/RoomsTables/RoomsTables";
import AddNewRoom from "../../../Components/dashboard/AddNewRoom/AddNewRoom";

const RoomDashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="md:p-[32px] flex flex-col gap-4">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[#202430] text-[24px] font-bold capitalize">
            Room
          </h1>
          <p className="text-[#ABADB7] text-[16px] font-bold">
            An overview of the hotel's available rooms, with details such as
            status (available, booked, maintained), price per night, and
            additional amenities. The manager can easily add new rooms or modify
            existing ones.
          </p>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-[264px] h-[48px] bg-[#2C3E50] rounded-[16px] text-[18px] font-medium text-white"
        >
          Add new room
        </button>

        {isOpen && <AddNewRoom setIsOpen={setIsOpen} isOpen={isOpen} />}
      </div>
      <div className=" shadow-md rounded-lg">
        {" "}
        <RoomsTables />{" "}
      </div>
    </div>
  );
};

export default RoomDashboard;
