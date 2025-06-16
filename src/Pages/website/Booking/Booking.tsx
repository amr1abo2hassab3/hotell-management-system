import { useContext, useEffect, useMemo, useState } from "react";
import Stepper from "../../../Components/website/Stepper/Stepper";
import ServiceBooking from "../../../Components/website/ServiceBooking/ServiceBooking";
import FormBookingDate from "../FormBookingDate/FormBookingDate";
import FormBookingUser from "../FormBookingUser/FormBookingUser";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, rooms } from "../../../Api/Api";
import { Room, Service } from "../../../interfaces/roomTypes";
import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "../../../Components/website/LoaderScreen/LoaderScreen";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import AddServicesQuantity from "../AddServicesQuantity/AddServicesQuantity";

interface stepsType {
  id: number;
  label: string;
}

const Booking = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const steps: stepsType[] = [
    { id: 1, label: "Booking Details" },
    { id: 2, label: "Payment Method" },
    { id: 3, label: "To Push" },
  ];

  const { setBookingId } = useContext(AuthContext);

  const { id } = useParams();
  const handleGetRoomDetails = (id: string | undefined) => {
    if (!id) return {} as Room;
    return axios.get(`${baseUrl}${rooms}/${id}`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<Room>({
    queryKey: ["getRoomDetails", id],
    queryFn: () => handleGetRoomDetails(id),
    enabled: !!id,
  });

  const services: Service[] = data?.services || [];

  const totalPrice = useMemo(() => {
    if (!data) return 0;
    const servicesTotal = data.services.reduce(
      (acc, service) => acc + service.servicePrice,
      0
    );
    return data.roomPrice + servicesTotal;
  }, [data]);

  useEffect(() => {
    const bookingId = JSON.parse(sessionStorage.getItem("bookingId") || "null");
    if (bookingId) setBookingId(bookingId);
  }, []);

  if (isLoading) return <LoaderScreen />;
  return (
    <div className="bg-[#000000] py-[50px]">
      <div className="container mx-auto">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>
      <div className="container mx-auto px-[15px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
          {currentStep === 1 && (
            <FormBookingDate
              services={services}
              setIsSuccess={setIsSuccess}
              isSuccess={isSuccess}
            />
          )}
          {currentStep === 2 && <FormBookingUser />}

          <div className="p-[30px] bg-white rounded-[24px] flex flex-col gap-[30px] ">
            <h2 className="font-bold text-[#202430] text-[32px] text-center">
              Overview of your room
            </h2>
            <div>
              <div className="flex items-center py-[20px] gap-[20px]">
                <img
                  src={data?.roomPictures[0]}
                  className="w-[100px] h-[100px] rounded-[8px]"
                  alt={data?.roomDescription}
                />
                <div>
                  <h3 className="font-bold text-[#202430] text-[24px]">
                    {data?.roomDescription}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col py-[20px] gap-[22px]">
                <div className="flex items-center justify-between">
                  <h5 className="capitalize font-medium text-[#0F1A24] text-[20px]">
                    room
                  </h5>
                  <p className="capitalize font-bold text-[#2C3E50] text-[20px]">
                    {data?.roomPrice}$
                  </p>
                </div>
                {data?.services.map((service: Service, index) => (
                  <ServiceBooking
                    key={service.serviceId}
                    index={index}
                    servicesName={service.serviceName}
                    Price={service.servicePrice}
                  />
                ))}
              </div>
              <div className="py-[20px]">
                <div className="flex items-center justify-between">
                  <h5 className="capitalize font-bold text-[#51586F] text-[24px]">
                    Total price
                  </h5>
                  <p className="capitalize font-bold text-[#8B6B4E] text-[20px]">
                    {totalPrice}$
                  </p>
                </div>
              </div>
              <AddServicesQuantity services={services} />
            </div>
            {isSuccess && (
              <>
                {" "}
                <button
                  onClick={() => {
                    setCurrentStep((prev) =>
                      prev < steps.length ? prev + 1 : prev
                    );
                    setIsSuccess(false);
                  }}
                  className="bg-[#C4A484] text-white px-[16px] py-[12px] rounded-[50px]"
                >
                  Go to the next step
                </button>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                  }}
                  className="bg-green-400 text-white px-[16px] py-[12px] rounded-[50px] font-bold"
                >
                  You want to update in Date Click here
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
