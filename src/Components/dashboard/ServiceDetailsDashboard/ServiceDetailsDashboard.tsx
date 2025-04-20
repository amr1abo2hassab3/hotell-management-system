import axios from "axios";
import LoaderScreen from "../../website/LoaderScreen/LoaderScreen";
import { baseUrl, services } from "../../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import { ServiceType } from "../../../interfaces/srvicesTypes";

interface ServiceDetailsDashboardProps {
  serviceId: number;
  isOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const ServiceDetailsDashboard = ({
  serviceId,
  isOpen,
  onClose,
  setIsEditModalOpen,
}: ServiceDetailsDashboardProps) => {
  const handleGetServiceDetails = (id: number | undefined) => {
    if (!id) return {} as ServiceType;
    return axios.get(`${baseUrl}${services}/${id}`).then((res) => res.data);
  };

  const { data: serviceData, isLoading } = useQuery<ServiceType>({
    queryKey: ["getServiceDetails", serviceId],
    queryFn: () => handleGetServiceDetails(serviceId),
    enabled: !!serviceId && isOpen,
  });

  if (isLoading) return <LoaderScreen />;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${
        isOpen
          ? "opacity-100 scale-100 animate-fade-in"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Service Details #{serviceData?.serviceId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>

        {serviceData && (
          <div className="p-6">
            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Background Image */}
              <div className="col-span-1">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
                  {serviceData.backgroundImage ? (
                    <img
                      src={serviceData.backgroundImage}
                      alt={`Service ${serviceData.serviceName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No background image available
                    </div>
                  )}
                </div>
              </div>

              {/* Icon Image */}
              <div className="col-span-1 flex items-center justify-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                  {serviceData.iconImage ? (
                    <img
                      src={serviceData.iconImage}
                      alt={`Service ${serviceData.serviceName} icon`}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No icon available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Basic Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Service Name:</span>
                      <span className="font-medium capitalize">
                        {serviceData.serviceName}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">
                        ${serviceData.servicePrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Description
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {serviceData.serviceDescription ||
                      "No description available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  setIsEditModalOpen(true);
                }}
                className="px-6 py-2 bg-[#C4A484] text-white rounded-md hover:bg-[#a06427] transition"
              >
                Edit Service
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsDashboard;
