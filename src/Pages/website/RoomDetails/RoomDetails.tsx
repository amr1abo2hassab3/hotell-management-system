import { useNavigate, useParams } from "react-router-dom";
import SliderDetails from "../../../Components/website/SliderDetails/SliderDetails";
import { useQuery } from "@tanstack/react-query";
import { Room } from "../../../interfaces/roomTypes";
import axios from "axios";
import { baseUrl, rooms, selectRoom } from "../../../Api/Api";
import LoaderScreen from "../../../Components/website/LoaderScreen/LoaderScreen";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const RoomDetails = () => {
  const [indexImage, setIndexImage] = useState<number>(0);
  const { idRoom } = useParams<string>();
  const navigate = useNavigate();
  const { setBookingId, userData } = useContext(AuthContext);

  const handleGetRoomDetails = (id: string | undefined) => {
    if (!id) return {} as Room;
    return axios.get(`${baseUrl}${rooms}/${id}`).then((res) => res.data);
  };
  const handleSelectRoom = async (roomId: number) => {
    try {
      toast.info("Selecting Room...", {
        position: "top-right",
        autoClose: 2000,
      });
      if (userData?.token) {
        const response = await axios.post(
          `${baseUrl}${selectRoom}`,
          {
            roomId: roomId,
          },
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );

        toast.success("Room has been Selected successfully");
        setBookingId(response.data);

        sessionStorage.setItem("bookingId", JSON.stringify(response?.data));
        await navigate(`/booking/${roomId}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || "Failed to Select Room";
        toast.error(message);
      } else {
        toast.error("Unexpected Error");
      }
    }
  };

  const { data, isLoading } = useQuery<Room>({
    queryKey: ["getRoomDetails", idRoom],
    queryFn: () => handleGetRoomDetails(idRoom),
    enabled: !!idRoom,
  });

  if (isLoading) return <LoaderScreen />;
  return (
    <div className="bg-black">
      <div className="container mx-auto my-10">
        <div
          className="w-full min-h-36 p-9 flex flex-col lg:flex-row justify-between items-center gap-[15px] "
          style={{ boxShadow: "0px 4px 12px 12px #BFBFBF" }}
        >
          {/* المحتوى الرئيسي */}
          <div className="w-full lg:w-3/4 flex flex-col gap-4">
            <div className="w-full h-[300px] lg:h-[600px] rounded-[8px] overflow-hidden">
              <img
                src={data?.roomPictures[indexImage]}
                className="w-full h-full object-cover"
                alt={data?.roomDescription}
              />
            </div>

            <div className="flex flex-col lg:flex-row  items-center gap-5">
              <div className="w-full lg:w-[60%] flex flex-wrap items-center  gap-6">
                {data?.roomPictures?.map((img: string, index: number) => (
                  <div
                    onClick={() => setIndexImage(index)}
                    key={index}
                    className={`w-full ${
                      indexImage === index &&
                      "scale-110 shadow-xl border-[#ABADB7] border-2"
                    } h-[200px] lg:h-[106px] rounded-[8px] overflow-hidden cursor-pointer transition-all`}
                    style={{
                      flexBasis: index < 3 ? "calc(33.33% - 16px)" : "100%",
                    }}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt={data.roomDescription}
                    />
                  </div>
                ))}
              </div>

              <div className="w-full lg:w-[40%] flex items-center justify-center">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star text-[24px] lg:text-[33px] ${
                        i < (data?.classification ?? 0)
                          ? "text-[#FFDB4A]"
                          : "text-[#ABADB7]"
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-[20px] lg:text-[32px] font-medium text-white">
                Indulge in luxury with our Deluxe Sea-View Suite, offering
                breathtaking vistas of the Aegean Sea. Immerse yourself in
                comfort and style, surrounded by contemporary design and
                world-class amenities.
              </p>
            </div>
          </div>
          {/* الـ sidebar */}
          <div className="w-full lg:w-1/4 flex flex-col items-center mt-10 lg:mt-0">
            <SliderDetails />
            <button
              onClick={() => {
                if (data?.roomId) handleSelectRoom(data?.roomId);
              }}
              className="px-[16px] py-[12px] w-[226px] h-[67px] flex items-center justify-center bg-[#007AFF] rounded text-white text-[20px] lg:text-[24px] mt-7"
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
