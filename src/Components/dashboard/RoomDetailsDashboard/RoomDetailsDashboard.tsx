import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl, rooms } from "../../../Api/Api";
import LoaderScreen from "../../website/LoaderScreen/LoaderScreen";

import { Room } from "../../../interfaces/roomTypes";

type RoomDetailsDashboardProps = {
  roomId: number;
  isOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

const RoomDetailsDashboard = ({
  roomId,
  onClose,
  isOpen,
  setIsEditModalOpen,
}: RoomDetailsDashboardProps) => {
  const handleGetRoomDetails = (id: number | undefined) => {
    if (!id) return {} as Room;
    return axios.get(`${baseUrl}${rooms}/${id}`).then((res) => res.data);
  };

  const { data: roomData, isLoading } = useQuery<Room>({
    queryKey: ["getRoomDetails", roomId],
    queryFn: () => handleGetRoomDetails(roomId),
    enabled: !!roomId,
  });

  if (isLoading) return <LoaderScreen />;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${
        isOpen
          ? "opacity-100 scale-100 animate-fade-in"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Room Details #{roomData?.roomId}
            {roomData?.isFeatured && (
              <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>

        {roomData && (
          <div className="p-6">
            {/* Images Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Main Image */}
              <div className="col-span-1">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
                  {roomData.roomPictures.length > 0 ? (
                    <img
                      src={roomData.roomPictures[0]}
                      alt={`Room ${roomData.roomId}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="col-span-1">
                <div className="grid grid-cols-3 gap-2">
                  {roomData.roomPictures.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="relative h-24 rounded-md overflow-hidden bg-gray-100"
                    >
                      <img
                        src={img}
                        alt={`Room ${roomData.roomId} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Basic Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Room Type:</span>
                      <span className="font-medium">{roomData.roomType}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">
                        ${roomData.roomPrice} per night
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`font-medium ${
                          roomData.roomStatus === "Available"
                            ? "text-green-600"
                            : roomData.roomStatus === "Booked"
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        {roomData.roomStatus}
                      </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < roomData.classification
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Description
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {roomData.roomDescription || "No description available"}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg h-full">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Services
                  </h3>

                  {roomData.services.length > 0 ? (
                    <ul className="space-y-3">
                      {roomData.services.map((service) => (
                        <li
                          key={service.serviceName}
                          className="flex items-center gap-3"
                        >
                          <span>{service.serviceName}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No additional services</p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  setIsEditModalOpen(true);
                }}
                className="px-6 py-2 bg-[#C4A484] text-white rounded-md hover:bg-[#a06427] transition"
              >
                Edit Room
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsDashboard;
