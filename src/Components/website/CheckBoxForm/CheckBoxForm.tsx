import axios from "axios";
import useGetAllServices from "../../../customHooks/useGetAllServices";
import { ServiceType } from "../../../interfaces/srvicesTypes";
import { baseUrl, roomTypes } from "../../../Api/Api";
import { RoomType } from "../../../interfaces/roomTypes";
import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { useState } from "react";

interface OpenSectionsType {
  budget: boolean;
  room: boolean;
  services: boolean;
  classification: boolean;
}

interface CheckBoxFormProps {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  roomTypeIds: number[];
  setRoomTypeIds: React.Dispatch<React.SetStateAction<number[]>>;
  serviceIds: number[];
  setServiceIds: React.Dispatch<React.SetStateAction<number[]>>;
  classification: number[];
  setClassification: React.Dispatch<React.SetStateAction<number[]>>;
}

const CheckBoxForm = ({
  price,
  setPrice,
  roomTypeIds,
  setRoomTypeIds,
  serviceIds,
  setServiceIds,
  classification,
  setClassification,
}: CheckBoxFormProps) => {
  const [openSections, setOpenSections] = useState<OpenSectionsType>({
    budget: true,
    room: true,
    services: true,
    classification: true,
  });

  // function open section
  const handleOpenSection = (key: keyof OpenSectionsType) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // get all services check box
  const { data: dataServices, isLoading: isLoadingSevices } =
    useGetAllServices();

  // get all type check box
  const handleGetAllTypeRoom = (): Promise<RoomType[]> => {
    return axios.get(`${baseUrl}${roomTypes}`).then((res) => res.data);
  };
  const { data: dataRoomTypes, isLoading: isLoadingRoomTypes } = useQuery<
    RoomType[]
  >({
    queryKey: ["getAllTypeRoom"],
    queryFn: handleGetAllTypeRoom,
  });

  if (isLoadingRoomTypes || isLoadingSevices) return <LoaderScreen />;
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-white text-center py-4 text-[40px] font-semibold">
        Pick Your Options
      </h2>
      <form className="border border-dotted  transition-all duration-300 border-[#9747FF] rounded-[16px] grid items-start grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4   p-8 bg-[#1E1E1E]">
        <div
          className={`border ${
            openSections.budget ? "h-full" : "h-[60px]"
          } overflow-hidden border-dashed border-[#9747FF] rounded-[5px] p-5 transition-all duration-300`}
        >
          <div className="text-[#EBEDF0] flex items-center justify-between">
            <h2 className="text-[18px] font-semibold">Your daily budget</h2>
            <span>
              <i
                onClick={() => handleOpenSection("budget")}
                className={`fa-solid ${
                  openSections.budget ? "fa-angle-up" : "fa-angle-down"
                } cursor-pointer`}
              ></i>
            </span>
          </div>
          {/* Checkboxes */}
          <div className="py-[12px] flex flex-col gap-[19px]">
            {[
              "$ 0 - $ 200",
              "$ 200 - $ 500",
              "$ 500 - $ 1000",
              "$ 1,000 - $ 2,000",
              "$ 2,000 - $ 5,000",
            ].map((label, index) => (
              <div key={index} className="flex gap-[16px] items-center">
                <input
                  className="min-w-[24px] min-h-[24px] rounded text-[#001A72] bg-[#F8F8F8]"
                  type="checkbox"
                  id={`price${index + 1}`}
                  name={`price${index + 1}`}
                  checked={price === index + 1}
                  onChange={() => {
                    setPrice(index + 1);
                  }}
                />
                <label
                  htmlFor={`price${index + 1}`}
                  className="text-[#F8F8F8] text-[16px] font-semibold"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`border ${
            openSections.room ? "h-full" : "h-[60px]"
          } overflow-hidden border-dashed border-[#9747FF] rounded-[5px] p-5 transition-all duration-300`}
        >
          <div className="text-[#EBEDF0] flex items-center justify-between">
            <h2 className="text-[18px] font-semibold">Room type</h2>
            <span>
              <i
                onClick={() => handleOpenSection("room")}
                className={`fa-solid ${
                  openSections.room ? "fa-angle-up" : "fa-angle-down"
                } cursor-pointer`}
              ></i>{" "}
            </span>
          </div>
          {/* Checkboxes */}
          <div className="py-[12px] flex flex-col gap-[19px]">
            {dataRoomTypes?.map((type: RoomType) => (
              <div
                key={type.roomTypeId}
                className="flex gap-[16px] items-center"
              >
                <input
                  className="min-w-[24px] min-h-[24px] rounded text-[#001A72] bg-[#F8F8F8]"
                  type="checkbox"
                  id={`${type.name}`}
                  name={`${type.name}`}
                  value={type.roomTypeId}
                  checked={roomTypeIds.includes(type.roomTypeId)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      setRoomTypeIds([...roomTypeIds, type.roomTypeId]);
                    } else {
                      setRoomTypeIds(
                        roomTypeIds.filter((id) => id !== type.roomTypeId)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`${type.name}`}
                  className="text-[#F8F8F8] text-[16px] font-semibold"
                >
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`border ${
            openSections.services ? "h-full" : "h-[60px]"
          } overflow-hidden border-dashed border-[#9747FF] rounded-[5px] p-5 transition-all duration-300`}
        >
          <div className="text-[#EBEDF0] flex items-center justify-between">
            <h2 className="text-[18px] font-semibold">Additional Services</h2>
            <span>
              <i
                onClick={() => handleOpenSection("services")}
                className={`fa-solid ${
                  openSections.services ? "fa-angle-up" : "fa-angle-down"
                } cursor-pointer`}
              ></i>{" "}
            </span>
          </div>
          {/* Checkboxes */}
          <div className="py-[12px] flex flex-col gap-[19px]">
            {dataServices?.map((service: ServiceType) => (
              <div
                key={service.serviceId}
                className="flex gap-[16px] items-center"
              >
                <input
                  className="min-w-[24px] min-h-[24px] rounded text-[#001A72] bg-[#F8F8F8]"
                  type="checkbox"
                  id={`${service.serviceName}`}
                  name={`${service.serviceName}`}
                  value={service.serviceId}
                  checked={serviceIds.includes(service.serviceId)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      setServiceIds([...serviceIds, service.serviceId]);
                    } else {
                      setServiceIds(
                        serviceIds.filter((id) => id !== service.serviceId)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`${service.serviceName}`}
                  className="text-[#F8F8F8] text-[16px] font-semibold"
                >
                  {service.serviceName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`border ${
            openSections.classification ? "h-full" : "h-[60px]"
          } overflow-hidden border-dashed border-[#9747FF] rounded-[5px] p-5 transition-all duration-300`}
        >
          <div className="text-[#EBEDF0] flex items-center justify-between">
            <h2 className="text-[18px] font-semibold">classification</h2>
            <span>
              <i
                onClick={() => handleOpenSection("classification")}
                className={`fa-solid ${
                  openSections.classification ? "fa-angle-up" : "fa-angle-down"
                } cursor-pointer`}
              ></i>{" "}
            </span>
          </div>
          {/* Checkboxes */}
          <div className="py-[12px] flex flex-col gap-[19px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="flex gap-[16px] items-center">
                <input
                  className="min-w-[24px] min-h-[24px] rounded text-[#001A72] bg-[#F8F8F8]"
                  type="checkbox"
                  id={`${star}`}
                  name={`${star}`}
                  value={star}
                  checked={classification.includes(star)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      setClassification([...classification, star]);
                    } else {
                      setClassification(
                        classification.filter((id) => id !== star)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={`${star}`}
                  className="text-[16px] font-semibold flex items-center gap-2 text-[#F8F8F8]"
                  aria-label={`${star} star rating`}
                >
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fa-solid fa-star ${
                        star - 1 >= index ? "text-[#FFDB4A]" : "text-[#F8F8F8]"
                      }`}
                    ></i>
                  ))}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckBoxForm;
