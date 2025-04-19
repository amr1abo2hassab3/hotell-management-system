import { useState } from "react";
import ServicesTables from "../../../Components/dashboard/ServicesTables/ServicesTables";
import AddNewService from "../../../Components/dashboard/AddNewService/AddNewService";

const ServicesDashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="md:p-[32px] flex flex-col gap-4">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[#202430] text-[24px] font-bold capitalize">
            Services
          </h1>
          <p className="text-[#ABADB7] text-[16px] font-bold">
            The hotel can provide them to guests, such as room service, airport
            transfers, massage sessions, etc. The manager can add new services,
            modify existing services, or remove them from the list.
          </p>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="w-[264px] h-[48px] bg-[#2C3E50] rounded-[16px] text-[18px] font-medium text-white"
        >
          Add new Service{" "}
        </button>

        {isOpen && <AddNewService setIsOpen={setIsOpen} isOpen={isOpen} />}
      </div>
      <div className=" shadow-md rounded-lg">
        {" "}
        <ServicesTables />{" "}
      </div>
    </div>
  );
};

export default ServicesDashboard;
