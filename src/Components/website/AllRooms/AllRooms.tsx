import { Room, RoomsResponse } from "../../../interfaces/roomTypes";
import Pagination from "../../Pagination/Pagination";
import CardRoom from "../CardRoom/CardRoom";

interface AllRoomsProps {
  dataRooms: RoomsResponse | undefined;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  isError: boolean;
}

const AllRooms = ({
  setPageNumber,
  dataRooms,
  pageNumber,
  isError,
}: AllRoomsProps) => {
  if (isError) {
    // إذا حدث خطأ، اعرض رسالة الخطأ
    return (
      <div className="container mx-auto py-5">
        <h2 className="text-[32px] text-white font-bold ">All rooms</h2>
        <div className="text-red-500 text-center text-[40px]">
          <p className="font-semibold"> No rooms found ‼ </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-[32px] py-5">
      <h2 className="text-[32px] text-white font-bold">All rooms</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px]">
        {dataRooms?.data?.map((room: Room) => (
          <CardRoom key={room.roomId} room={room} />
        ))}
      </div>
      <Pagination
        totalPages={Math.max(1, Math.ceil(dataRooms?.totalPages || 0))}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default AllRooms;
