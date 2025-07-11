import { Link } from "react-router-dom";
import FeaturedRoomsCard from "./../FeaturedRoomsCard/FeaturedRoomsCard";
import useGetAllFeatured from "../../../customHooks/useGetAllFeatured";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { Room } from "../../../interfaces/roomTypes";

const FeaturedRooms = () => {
  const { data, isLoading } = useGetAllFeatured();

  if (isLoading) return <LoaderScreen />;
  return (
    <div className="container mx-auto flex-col flex gap-8 px-4">
      <div className="flex items-center justify-between ">
        <h2 className="md:text-[32px] text-[20px] font-bold">
          Featured <span className="text-[#D4AF37]">Room Types</span>
        </h2>
        <Link
          to={"/room"}
          className="flex items-center gap-2 md:gap-4 text-[#8B6B4E] text-[12px] md:text-[16px] "
        >
          <span> View all rooms</span>
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-[56px]">
        {data?.data?.map((item: Room) => (
          <FeaturedRoomsCard key={item.roomId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
