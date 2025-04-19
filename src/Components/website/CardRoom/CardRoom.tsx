import { Link } from "react-router-dom";
import { Room } from "../../../interfaces/roomTypes";
import { useContext } from "react";
import { FavoriteContext } from "../../../Context/FavoriteListContext";

type CardRoomProps = {
  room: Room;
};

const CardRoom = ({ room }: CardRoomProps) => {
  const { handleAddToUserFavorite, handleDeleteFromUserFavorite } =
    useContext(FavoriteContext);
  return (
    <div className="p-[16px] bg-[#FFFFFF] rounded-[16px] flex flex-col sm:flex-row gap-[12px] ">
      <div className="min-w-[270px] h-[200px] rounded-[8px] overflow-hidden">
        <img
          src={room.roomPictures[0]}
          alt={room.roomDescription}
          className="w-full h-full object-fit-cover"
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <div className="flex justify-between">
          <h3 className="text-[18px] font-semibold text-[#25324B]">
            {room.roomDescription}
          </h3>
          <div className="bg-[#ECF0F1] w-[50px] h-[50px] rounded flex items-center justify-center">
            <i
              onClick={() => {
                if (room.isFavorite) {
                  handleDeleteFromUserFavorite(room?.roomId);
                } else {
                  handleAddToUserFavorite(room?.roomId);
                }
              }}
              className={`${
                room.isFavorite ? "fa-solid" : "fa-regular"
              } fa-heart text-[#F12525] text-[32px] cursor-pointer`}
            ></i>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa-solid fa-star ${
                room.classification >= star
                  ? "text-[#FFDB4A]"
                  : "text-[#ABADB7]"
              }`}
            ></i>
          ))}
          {room.classification}
        </div>
        <div>
          <h4 className="text-[16px] text-[#51586F]">
            Price:{" "}
            <span className="font-semibold text-[#2C3E50]">
              ${room.roomPrice}
            </span>{" "}
            per night.
          </h4>
        </div>
        <div>
          <p className="text-[14px] text-[#7C8493]">
            Enjoy a luxurious stay with stunning views of the city skyline, a
            room that combines elegance and comfort.
          </p>
        </div>
        <div className="flex justify-end">
          <Link
            to={`/room/roomDetails/${room.roomId}`}
            className="bg-[#986D3C] flex items-center justify-center  text-white rounded-[8px] w-[132px] h-[32px] font-medium text-[14px]"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
