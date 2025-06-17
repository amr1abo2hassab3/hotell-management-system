import { useState } from "react";
import useGetAllServices from "../../../customHooks/useGetAllServices";
import { ServiceType } from "../../../interfaces/srvicesTypes";
import CardService from "../CardService/CardService";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import ModelAddService from "../ModelAddService/ModelAddService";

const AllServices = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const { data, isLoading } = useGetAllServices();

  if (isLoading) return <LoaderScreen />;
  return (
    <div className="container mx-auto py-9 flex flex-col gap-[32px] ">
      {isOpen && (
        <ModelAddService
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setServiceId={setServiceId}
          serviceId={serviceId}
        />
      )}
      <h2 className="text-[32px] text-white font-bold">All Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
        {data?.map((service: ServiceType) => (
          <CardService
            setServiceId={setServiceId}
            setIsOpen={setIsOpen}
            key={service.serviceId}
            service={service}
          />
        ))}
      </div>
    </div>
  );
};

export default AllServices;
