import axios from "axios";
import { useContext, useState } from "react";
import { baseUrl, services } from "../../../Api/Api";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { AuthContextProps } from "../../../interfaces/authTypes";
import { useQuery } from "@tanstack/react-query";
import LoaderDashboard from "../LoaderDashboard/LoaderDashboard";
import { toast } from "react-toastify";
import { ServiceType } from "../../../interfaces/srvicesTypes";
import ServiceDetailsDashboard from "../ServiceDetailsDashboard/ServiceDetailsDashboard";
import EditService from "../EditServices/EditServices";

const ServicesTables = () => {
  const { userData } = useContext<AuthContextProps>(AuthContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [serviceId, setService] = useState<number>(0 as number);

  const onClose = () => {
    setIsOpen(false);
  };
  const handleGetAllServices = () => {
    return axios.get(`${baseUrl}${services}`).then((res) => res.data);
  };

  const handleDeleteService = async (serviceId: number) => {
    try {
      await toast.promise(
        axios.delete(`${baseUrl}${services}/${serviceId}?id=${serviceId}`),
        {
          pending: "Deleting Service...",
          success: "Service has been deleted successfully",
          error: "Failed to delete Service",
        },
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      await refetchServices();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data,
    isLoading,
    refetch: refetchServices,
  } = useQuery<ServiceType[]>({
    queryKey: ["getAllServices"],
    queryFn: handleGetAllServices,
    enabled: !!userData?.token,
  });

  const servicesData = data;

  return (
    <div className="py-4 flex flex-col gap-4">
      <ServiceDetailsDashboard
        serviceId={serviceId}
        onClose={onClose}
        isOpen={isOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <EditService
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        serviceId={serviceId}
      />
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-3 px-3">
          <h3 className="font-medium text-[18px] text-[#202430]">Services</h3>
        </div>
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-md bg-white">
          {isLoading ? (
            <LoaderDashboard />
          ) : servicesData && servicesData?.length > 0 ? (
            <table className="w-full table-auto min-w-max text-center">
              <thead>
                <tr>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Image background
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Image Icon
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Name
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Description
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Price
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {servicesData?.map((service: ServiceType) => (
                  <tr
                    key={service.serviceId}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-4 border-x border-slate-200">
                      <img
                        src={
                          service.backgroundImage ||
                          "https://via.placeholder.com/40"
                        }
                        alt={service.serviceName}
                        className="w-[90%] h-[150px] object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      <img
                        src={
                          service.iconImage || "https://via.placeholder.com/40"
                        }
                        alt={service.serviceName}
                        className="w-[40px] h-[40px] object-cover rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {service.serviceName}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {service.serviceDescription}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      ${service.servicePrice}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      <div className="flex flex-col items-center gap-2 min-w-[120px]">
                        <button
                          onClick={() => {
                            setService(service.serviceId);
                            setIsEditModalOpen(true);
                          }}
                          className="bg-yellow-400 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-pen"></i> Edit
                        </button>
                        <button
                          onClick={() => {
                            setService(service.serviceId);
                            setIsOpen(true);
                          }}
                          className="bg-blue-500 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteService(service.serviceId);
                          }}
                          className="bg-red-600 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="py-5 text-center text-[25px] font-bold text-red-600">
              No Services Found 🥱
            </h2>
          )}
        </div>
        {/* للشاشات الصغيرة - عرض بطاقات (Cards) */}
        <div className="md:hidden grid grid-cols-1 gap-4 px-3">
          {isLoading ? (
            <LoaderDashboard />
          ) : servicesData && servicesData?.length > 0 ? (
            servicesData?.map((service: ServiceType) => (
              <div
                key={service.serviceId}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        service.backgroundImage ||
                        "https://via.placeholder.com/40"
                      }
                      alt={service.serviceName}
                      className="w-[40px] h-[40px] object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={
                        service.iconImage || "https://via.placeholder.com/40"
                      }
                      alt={service.serviceName}
                      className="w-[40px] h-[40px] object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{service.serviceName}</h4>
                    <p className="text-sm text-gray-500">
                      ${service.servicePrice}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {service.serviceDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setService(service.serviceId);
                      setIsEditModalOpen(true);
                    }}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    <i className="fas fa-pen text-xs"></i> Edit
                  </button>
                  <button
                    onClick={() => {
                      setService(service.serviceId);
                      setIsOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    <i className="fas fa-eye text-xs"></i> View
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteService(service.serviceId);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    <i className="fas fa-trash text-xs"></i> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="py-5 text-center text-[25px] font-bold text-red-600">
              No Services Found 🥱
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesTables;
