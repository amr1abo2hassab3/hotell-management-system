import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl, favorite } from "../../../Api/Api";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import CardRoom from "../CardRoom/CardRoom";
import { Room, RoomsResponse } from "../../../interfaces/roomTypes";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import Pagination from "../../Pagination/Pagination";

const SavedRooms = () => {
  const { userData } = useContext(AuthContext);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleGetAllFavoriteRooms = (): Promise<RoomsResponse> => {
    if (!userData?.id) {
      return Promise.resolve({} as RoomsResponse);
    }
    return axios
      .get(
        `${baseUrl}${favorite}/${userData.id}?userId=${userData.id}&pageNumber=${pageNumber}`
      )
      .then((res) => res.data);
  };

  const { data, isLoading } = useQuery<RoomsResponse>({
    queryKey: ["getAllFavoriteRooms", pageNumber],
    queryFn: handleGetAllFavoriteRooms,
    enabled: !!userData?.id,
  });
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;
  const pageSize = data?.pageSize ?? 10;

  return (
    <div className="md:p-[32px] flex flex-col gap-4">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[#202430] text-[24px] font-bold capitalize">
            Saved rooms
          </h1>
          <p className="text-[#ABADB7] text-[16px] font-bold">
            Here you can browse the list of rooms you have saved for later
            review or to book at a convenient time. This feature helps you keep
            track of the rooms you are interested in without having to search
            again.
          </p>
        </div>
        <h3 className="text-[#191919] text-[18px] font-bold">
          List of saved rooms
        </h3>
      </div>

      {isLoading ? (
        <LoaderScreen />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px]">
          {data && data?.data.length > 0 ? (
            data?.data.map((room: Room) => (
              <CardRoom key={room.roomId} room={room} />
            ))
          ) : (
            <p className="text-gray-500">You haven't saved any rooms yet.</p>
          )}
        </div>
      )}
      <div className="flex justify-center items-center px-4 py-3">
        {totalCount > pageSize && (
          <>
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={Math.max(1, Math.ceil(totalPages || 0))}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SavedRooms;
