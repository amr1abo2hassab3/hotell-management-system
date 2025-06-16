import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import LoaderDashboard from "../../dashboard/LoaderDashboard/LoaderDashboard";
import dayjs from "dayjs";
import { MyBooking } from "../../../interfaces/bookingDashbard";

const MyReservationTable = () => {
  const { userData } = useContext(AuthContext);

  const handleGetAllMyBookings = async () => {
    if (userData?.id) {
      const res = await axios.get(
        `https://hotellapp.runasp.net/api/Users/${userData.id}/Userbookings`
      );
      return res.data;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["handleGetAllMyBookings"],
    queryFn: handleGetAllMyBookings,
    enabled: !!userData?.id,
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center flex-wrap gap-3 px-3">
        <h3 className="font-medium text-[18px] text-[#202430]">My bookings</h3>
      </div>

      {/* Table View for large screens */}
      <div className="overflow-x-auto hidden lg:block rounded-lg shadow-md bg-white">
        {isLoading ? (
          <LoaderDashboard />
        ) : data?.length > 0 ? (
          <table className="w-full table-auto min-w-[700px] text-center">
            <thead>
              <tr>
                <th className="p-4 border border-slate-200 bg-slate-50">
                  number booking
                </th>
                <th className="p-4 border border-slate-200 bg-slate-50">
                  Room
                </th>
                <th className="p-4 border border-slate-200 bg-slate-50">
                  Total Price
                </th>
                <th className="p-4 border border-slate-200 bg-slate-50">
                  Arrival
                </th>
                <th className="p-4 border border-slate-200 bg-slate-50">
                  Departure
                </th>
                <th className="p-4 border border-slate-200 bg-slate-50">
                  Condition
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking: MyBooking) => (
                <tr
                  key={booking.bookingId}
                  className="hover:bg-slate-50 border-b border-slate-200"
                >
                  <td className="p-4 border-x border-slate-200">
                    {booking.bookingId}
                  </td>
                  <td className="p-4 border-x border-slate-200">
                    <div className="flex items-center gap-2 md:gap-3">
                      <img
                        src={`https://hotellapp.runasp.net${
                          booking.roomPicture.split(",")[0]
                        }`}
                        alt="Room"
                        className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
                      />
                      <span className="text-left">
                        {booking.roomDescription}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 border-x border-slate-200">
                    {booking.totalPrice} EGP
                  </td>
                  <td className="p-4 border-x border-slate-200">
                    {booking.arrivalDate
                      ? dayjs(booking.arrivalDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </td>
                  <td className="p-4 border-x border-slate-200">
                    {booking.departureDate
                      ? dayjs(booking.departureDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </td>
                  <td className="p-4 border-x border-slate-200">
                    <p
                      className={`px-3 py-[5px] border rounded-[10px] font-medium text-sm
                        ${
                          booking.bookingCondition.toLowerCase() === "pending"
                            ? "border-[#2ECC71] text-[#2ECC71]"
                            : booking.bookingCondition.toLowerCase() ===
                              "cancelled"
                            ? "border-[#F12525] text-[#F12525]"
                            : booking.bookingCondition.toLowerCase() ===
                              "confirmed"
                            ? "border-[#D4AF37] text-[#D4AF37]"
                            : "border-gray-300 text-gray-600"
                        }`}
                    >
                      {booking.bookingCondition}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="py-5 text-center text-[20px] font-bold text-red-600">
            No Bookings Found 🥱
          </h2>
        )}
      </div>

      {/* Card View for mobile and tablet screens */}
      <div className="grid gap-4 lg:hidden">
        {isLoading ? (
          <LoaderDashboard />
        ) : data?.length > 0 ? (
          data.map((booking: MyBooking) => (
            <div
              key={booking.bookingId}
              className="bg-white rounded-lg shadow-md border border-slate-200"
            >
              <div className="p-4 flex gap-3 items-start">
                <img
                  src={`https://hotellapp.runasp.net${
                    booking.roomPicture.split(",")[0]
                  }`}
                  alt="Room"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-1">
                  <h2 className="font-semibold text-slate-800">
                    #{booking.bookingId} — {booking.roomDescription}
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Total: {booking.totalPrice} EGP
                  </p>
                  <p className="text-slate-500 text-sm">
                    Arrival:{" "}
                    {booking.arrivalDate
                      ? dayjs(booking.arrivalDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </p>
                  <p className="text-slate-500 text-sm">
                    Departure:{" "}
                    {booking.departureDate
                      ? dayjs(booking.departureDate).format("DD/MM/YYYY")
                      : "N/A"}
                  </p>
                  <p
                    className={`px-2 py-[3px] inline-block border rounded text-xs mt-1
                      ${
                        booking.bookingCondition.toLowerCase() === "pending"
                          ? "border-[#2ECC71] text-[#2ECC71] bg-[#2ECC7110]"
                          : booking.bookingCondition.toLowerCase() ===
                            "cancelled"
                          ? "border-[#F12525] text-[#F12525] bg-[#F1252510]"
                          : booking.bookingCondition.toLowerCase() ===
                            "confirmed"
                          ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF3710]"
                          : "border-gray-300 text-gray-600"
                      }`}
                  >
                    {booking.bookingCondition}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="py-5 text-center text-[20px] font-bold text-red-600">
            No Bookings Found 🥱
          </h2>
        )}
      </div>
    </div>
  );
};

export default MyReservationTable;
