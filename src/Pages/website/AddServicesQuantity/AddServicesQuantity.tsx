import { useState, useContext } from "react";
import axios from "axios";
import { Service } from "../../../interfaces/roomTypes";
import { baseUrl, booking, selectService } from "../../../Api/Api";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

interface AddServicesQuantityProps {
  services: Service[];
}

const AddServicesQuantity = ({ services }: AddServicesQuantityProps) => {
  const { bookingId } = useContext(AuthContext);

  // 🟡 هنا state لكل serviceId
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const increaseQuantity = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQuantity = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const handleSelectServices = async () => {
    const servicesData = services.map((service) => ({
      serviceId: service.serviceId,
      quantity: quantities[service.serviceId] || 0,
    }));

    try {
      await toast.promise(
        axios.post(
          `${baseUrl}${booking}${bookingId.bookingId}/${selectService}`,
          servicesData
        ),
        {
          pending: "Selecting services...",
          success: "Services selected successfully. Go to the next step.",
          error: "Failed to select services.",
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[24px] font-semibold ">Add your favorite services</h3>
      <ul className="px-[24px] py-[16px] flex flex-col gap-[10px] text-[#9d9c9c] list-disc">
        <li>
          You can add extra services to your booking at any time to ensure a
          comprehensive accommodation experience that suits your needs.
        </li>
        <li>
          Choose your services carefully to enhance your comfort and well-being
          during your stay.
        </li>
      </ul>

      <div className="flex flex-col gap-[30px]">
        {services.map((service: Service) => (
          <div
            key={service.serviceId}
            className="py-[16px] px-[24px] bg-white rounded-[12px] flex justify-between items-center shadow-lg"
          >
            <div>
              <h4 className="text-[#919195] text-[20px] font-bold">
                {service.serviceName}
              </h4>
              <h5 className="text-[#ABADB7] text-[20px] font-bold">
                {service.servicePrice}$
              </h5>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-[150px] rounded-[12px] border border-[#C4A484] h-[50px] text-[#007AFF] flex cursor-pointer">
                <div
                  className="w-1/3 flex items-center justify-center font-bold text-[24px]"
                  onClick={() => decreaseQuantity(service.serviceId)}
                >
                  <i className="fa-solid fa-minus"></i>
                </div>
                <div className="w-1/3 flex items-center justify-center font-bold text-[24px] bg-[#C4A484]">
                  {quantities[service.serviceId] || 0}
                </div>
                <div
                  className="w-1/3 flex items-center justify-center font-bold text-[24px]"
                  onClick={() => increaseQuantity(service.serviceId)}
                >
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>

              {/* زر الإرسال */}
              <button
                className="bg-[#007AFF] text-white rounded-[8px] px-[16px] py-[8px] font-semibold"
                onClick={() => handleSelectServices(service.serviceId)}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddServicesQuantity;
