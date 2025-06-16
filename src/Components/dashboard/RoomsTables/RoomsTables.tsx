import axios from "axios";
import { useContext, useState } from "react";
import { baseUrl, roomFilter, rooms } from "../../../Api/Api";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { AuthContextProps } from "../../../interfaces/authTypes";
import { Room, RoomsResponse, Service } from "../../../interfaces/roomTypes";
import { useQuery } from "@tanstack/react-query";
import LoaderDashboard from "../LoaderDashboard/LoaderDashboard";
import Pagination from "../../Pagination/Pagination";
import { toast } from "react-toastify";
import RoomDetailsDashboard from "../RoomDetailsDashboard/RoomDetailsDashboard";
import EditRoom from "../EditRoom/EditRoom";

const RoomsTables = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number>(0 as number);
  const { userData } = useContext<AuthContextProps>(AuthContext);

  const handleGetAllRooms = () => {
    return axios
      .post(
        `${baseUrl}${roomFilter}?pageNumber=${pageNumber}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      )
      .then((res) => res.data);
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await toast.promise(
        axios.delete(`${baseUrl}${rooms}/${roomId}?id=${roomId}`),
        {
          pending: "Deleting Room...",
          success: "Room has been deleted successfully",
          error: "Failed to delete Room",
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
      await refetchRooms();
    } catch (error) {
      console.log(error);
    }
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const {
    data,
    isLoading,
    refetch: refetchRooms,
  } = useQuery<RoomsResponse>({
    queryKey: ["getAllRooms", pageNumber],
    queryFn: handleGetAllRooms,
    enabled: !!userData?.token,
  });

  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;
  const pageSize = data?.pageSize ?? 10;
  const roomsData = data?.data ?? [];

  return (
    <div className="py-4 flex flex-col gap-4">
      <RoomDetailsDashboard
        roomId={roomId}
        onClose={onClose}
        isOpen={isOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <EditRoom
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        roomId={roomId}
      />
      <div className="w-full flex flex-col gap-4">
        {/* Header + Search */}
        <div className="flex justify-between items-center flex-wrap gap-3 px-3">
          <h3 className="font-medium text-[18px] text-[#202430]">Rooms</h3>
        </div>

        {/* TABLE for large screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-md bg-white">
          {isLoading ? (
            <LoaderDashboard />
          ) : roomsData?.length > 0 ? (
            <table className="w-full table-auto min-w-max text-center">
              <thead>
                <tr>
                  <th className="p-4 border border-slate-200 bg-slate-50">#</th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Image
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Type
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Description
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Price
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Status
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Services
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((room: Room, index: number) => (
                  <tr
                    key={room.roomId}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-4 border-x border-slate-200">
                      {index + 1}
                    </td>
                    <td className="p-4 border-x border-slate-200 relative">
                      <img
                        src={room.roomPictures[0]}
                        alt={room.roomDescription}
                        className="w-[80px] h-16 object-cover rounded-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                      />
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {room.roomTypeName}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {room.roomDescription}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      ${room.roomPrice}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      <p
                        className={`px-4 py-[7px] border  cursor-pointer rounded-[12px] font-medium ${
                          room.roomStatus.toLowerCase() === "available" &&
                          "border-[#2ECC71] text-[#2ECC71]"
                        } ${
                          room.roomStatus.toLowerCase() === "booked" &&
                          "border-[#F12525] text-[#F12525]"
                        }
                        ${
                          room.roomStatus.toLowerCase() === "maintenance" &&
                          "border-[#D4AF37] text-[#D4AF37]"
                        }`}
                      >
                        {" "}
                        {room.roomStatus}
                      </p>
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {room?.services?.length ? (
                        <ul>
                          {room?.services?.map(
                            (service: Service, index: number) => (
                              <li key={index}>{service.serviceName}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="py-5 text-center  font-bold text-red-600">
                          No Services In This Room 🥱
                        </p>
                      )}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      <div className="flex flex-col items-center gap-2 min-w-[120px]">
                        <button
                          onClick={() => {
                            setRoomId(room.roomId);
                            setIsEditModalOpen(true);
                          }}
                          className="bg-yellow-400 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-pen"></i> Edit
                        </button>
                        <button
                          onClick={() => {
                            setRoomId(room.roomId);
                            setIsOpen(true);
                          }}
                          className="bg-blue-500 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteRoom(room.roomId);
                          }}
                          className="bg-red-600 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="py-5 text-center text-[25px] font-bold text-red-600">
              No Rooms Found 🥱
            </h2>
          )}
        </div>
        {/* CARD view for mobile screens */}
        <div className="block md:hidden ">
          {isLoading ? (
            <LoaderDashboard />
          ) : roomsData.length > 0 ? (
            <div className="grid gap-4">
              {data?.data?.map((room: Room) => (
                <div
                  key={room.roomId}
                  className="bg-white  rounded-lg shadow-md border border-slate-200 "
                >
                  <div className="flex  flex-col gap-4">
                    <div>
                      {" "}
                      <img
                        src={room.roomPictures[0]}
                        alt={room.roomDescription}
                        className="w-full h-[400px] object-cover rounded-md"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    {" "}
                    <div className="">
                      <h4 className="font-semibold text-slate-800">
                        {room.roomTypeName}
                      </h4>
                      <p className="text-sm text-slate-500 my-2">
                        {room.roomDescription}
                      </p>
                      <p className="font-medium text-blue-600">
                        ${room.roomPrice}
                      </p>
                      <div className="my-2">
                        {room?.services?.length ? (
                          <ul>
                            {room?.services?.map(
                              (service: Service, index: number) => (
                                <li key={index}>{service.serviceName}</li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="py-5 text-center text-[25px] font-bold text-red-600">
                            No Services In This Room 🥱
                          </p>
                        )}
                      </div>
                      <p
                        className={`text-xs my- mt-1 inline-block px-3 py-1 rounded-full font-semibold capitalize ${
                          room.roomStatus.toLowerCase() === "available" &&
                          "bg-green-100 text-green-600"
                        } ${
                          room.roomStatus.toLowerCase() === "booked" &&
                          "bg-red-100 text-red-600"
                        } ${
                          room.roomStatus.toLowerCase() === "maintenance" &&
                          "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {room.roomStatus}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          setRoomId(room.roomId);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-yellow-400 text-white flex-1 py-2 rounded-md text-sm font-bold hover:opacity-90"
                      >
                        <i className="fas fa-pen mr-1"></i> Edit
                      </button>
                      <button
                        onClick={() => {
                          setRoomId(room.roomId);
                          setIsOpen(true);
                        }}
                        className="bg-blue-500 text-white flex-1 py-2 rounded-md text-sm font-bold hover:opacity-90"
                      >
                        <i className="fas fa-eye mr-1"></i> View
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteRoom(room.roomId);
                        }}
                        className="bg-red-600 text-white flex-1 py-2 rounded-md text-sm font-bold hover:opacity-90"
                      >
                        <i className="fas fa-trash mr-1"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="py-5 text-center text-[20px] font-bold text-red-600">
              No Rooms Found 🥱
            </h2>
          )}
        </div>

        {/* pagination  */}
        <div className="flex justify-between items-center px-4 py-3">
          {totalCount > pageSize ? (
            <>
              <div className="text-sm text-slate-500">
                Showing{" "}
                <b>
                  {(pageNumber - 1) * pageSize + 1}-
                  {Math.min(pageNumber * pageSize, totalCount)}
                </b>{" "}
                of {totalCount}
              </div>
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={Math.max(1, Math.ceil(totalPages || 0))}
              />
            </>
          ) : (
            <div className="text-sm text-slate-500">
              All users: {totalCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsTables;
