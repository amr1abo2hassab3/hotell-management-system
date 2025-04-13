import imgBathhub from "../../../assets/images/bathhub.png";
import imgWifi from "../../../assets/images/wifi.png";
import imgBed from "../../../assets/images/bed.png";
import imgTv from "../../../assets/images/tv.png";
import { Link } from "react-router-dom";
import { Room, Service } from "../../../interfaces/roomTypes";

interface Amenity {
  img: string;
  label: string;
}
interface FeaturedRoomsCardProps {
  item: Room;
}

const amenities: Amenity[] = [
  { img: imgBathhub, label: "bathtub" },
  { img: imgWifi, label: "Free wifi" },
  { img: imgBed, label: "King size bed" },
  { img: imgTv, label: "TV" },
];
const FeaturedRoomsCard = ({ item }: FeaturedRoomsCardProps) => {
  return (
    <div className="p-[16px]  rounded-[16px] flex flex-col gap-[8px] bg-[#FFFFFF]">
      <div className="mb-4">
        <img
          className="h-[200px] w-full object-fit-contain"
          src={item.roomPicture}
          alt={item.roomDescription}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <h3 className="text-[#25324B] mb-[5px]">{item.roomDescription}</h3>
        <h4>
          Price: <span className="font-bold">${item.roomPrice}</span> per night.
        </h4>
        <div className="grid grid-cols-3 gap-2 my-[8px]">
          {amenities.map((item) => (
            <div key={item.label} className="flex items-center  gap-[6px]">
              <div>
                <img src={item.img} alt="" />
              </div>
              <span className="text-[#51586F] text-[10px]">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-[#7C8493] leading-[1.5]">
          {item.services.map((serv: Service) => (
            <span key={serv.serviceName}>{serv.serviceName}</span>
          ))}
        </p>
        <div className="flex items-center justify-between">
          <Link
            to={`/room/roomDetails/${item.roomId}`}
            className="capitalize bg-[#986D3C] w-[136px] h-[32px] rounded text-white flex items-center justify-center"
          >
            book now
          </Link>
          {item.isFavorite ? (
            <i className="fa-solid fa-heart text-[#E8587A] text-[32px] cursor-pointer"></i>
          ) : (
            <i className="fa-regular fa-heart text-[#E8587A] text-[32px] cursor-pointer"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRoomsCard;
