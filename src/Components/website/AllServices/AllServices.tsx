import useGetAllServices from "../../../customHooks/useGetAllServices";
import { ServiceType } from "../../../interfaces/srvicesTypes";
import CardService from "../CardService/CardService";
import LoaderScreen from "../LoaderScreen/LoaderScreen";

const AllServices = () => {
  const { data, isLoading } = useGetAllServices();

  if (isLoading) return <LoaderScreen />;
  return (
    <div className="container mx-auto py-9 flex flex-col gap-[32px] ">
      <h2 className="text-[32px] text-white font-bold">All Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
        {data?.map((service: ServiceType) => (
          <CardService key={service.serviceId} service={service} />
        ))}
      </div>
    </div>
  );
};

export default AllServices;
