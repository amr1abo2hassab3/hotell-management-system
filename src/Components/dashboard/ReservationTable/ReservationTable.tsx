import axios from "axios";
import LoaderDashboard from "../LoaderDashboard/LoaderDashboard";
import {
  AllCurrentBooking,
  baseUrl,
  booking,
  cancelBooking,
  confirmBooking,
  detailsBooking,
} from "../../../Api/Api";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../Pagination/Pagination";
import { Booking, BookingResponse } from "../../../interfaces/bookingDashbard";
import dayjs from "dayjs";
import BookingDetailsDashboard from "../BookingDetailsDashboard/BookingDetailsDashboard";
import { toast } from "react-toastify";

const ReservationTable = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookingNumber, setBookingNumber] = useState<number>(0 as number);

  //this function get all current booking user
  const handleGetAllCurrentBooking = () => {
    return axios
      .get(`${baseUrl}${AllCurrentBooking}?pageNumber=${pageNumber}`)
      .then((res) => res.data);
  };
  // this function get booking details
  const handleGetBookingDetails = (BookingId: number) => {
    return axios
      .get(`${baseUrl}${booking}${BookingId}${detailsBooking}`)
      .then((res) => res.data);
  };
  // this function cancel booking user
  const handleCancelationBooking = async (BookingId: number) => {
    try {
      await toast.promise(
        axios.put(`${baseUrl}${booking}${BookingId}${cancelBooking}`),
        {
          pending: "Cancelation Booking...",
          success: "Booking has been Cancelated successfully",
          error: "Failed to Cancel Booking",
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
      await refetchBooking();
    } catch (error) {
      console.log(error);
    }
  };
  // this function confirmation booking user
  const handleConfirmationBooking = async (BookingId: number) => {
    try {
      await toast.promise(
        axios.put(`${baseUrl}${booking}${BookingId}${confirmBooking}`),
        {
          pending: "Confirming Booking...",
          success: "Booking has been confirmed successfully",
          error: "Failed to confirm booking",
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
      await refetchBooking();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data,
    isLoading,
    refetch: refetchBooking,
  } = useQuery<BookingResponse>({
    queryKey: ["getAllCurrentBooking", pageNumber],
    queryFn: handleGetAllCurrentBooking,
  });
  const {
    data: dataDetails,
    isLoading: isLoadingDetails,
    refetch: refetchBookingDetails,
  } = useQuery({
    queryKey: ["getBookingDetails", bookingNumber],
    queryFn: () => handleGetBookingDetails(bookingNumber),
    enabled: !!bookingNumber,
  });

  const onClose = () => {
    setIsOpen(false);
  };

  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;
  const pageSize = data?.pageSize ?? 10;
  const BookingData = data?.data ?? [];

  return (
    <div className="py-4 flex flex-col gap-4">
      <BookingDetailsDashboard
        roomId={bookingNumber}
        onClose={onClose}
        isOpen={isOpen}
        bookingData={dataDetails}
        isLoadingDetails={isLoadingDetails}
      />

      <div className="w-full flex flex-col gap-4">
        {/* Header + Search */}
        <div className="flex justify-between items-center flex-wrap gap-3 px-3">
          <h3 className="font-medium text-[18px] text-[#202430]">
            Current Bookings
          </h3>
        </div>

        {/* TABLE for large screens */}
        <div className="hidden md:block overflow-x-auto rounded-lg shadow-md bg-white">
          {isLoading ? (
            <LoaderDashboard />
          ) : BookingData?.length > 0 ? (
            <table className="w-full table-auto min-w-max text-center">
              <thead>
                <tr>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Booking number
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Customer Name
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Room type
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Arrival date
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Departure date
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    the condition
                  </th>
                  <th className="p-4 border border-slate-200 bg-slate-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((booking: Booking) => (
                  <tr
                    key={booking.bookingNumber}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-4 border-x border-slate-200">
                      {booking.bookingNumber}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {booking.customerName}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {booking.roomType}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {dayjs(booking.arrivalDate).format("DD/MM/YYYY")}{" "}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      {dayjs(booking.departureDate).format("DD/MM/YYYY")}{" "}
                    </td>
                    <td className="p-4 border-x border-slate-200">
                      <p
                        className={`px-4 py-[7px] border  cursor-pointer rounded-[12px] font-medium 
                          ${
                            booking.condition.toLowerCase() ===
                              "pending".toLocaleLowerCase() &&
                            "border-[#2ECC71] text-[#2ECC71]"
                          } 
                          ${
                            booking.condition.toLowerCase() ===
                              "Cancelled".toLocaleLowerCase() &&
                            "border-[#F12525] text-[#F12525]"
                          } 
                        ${
                          booking.condition.toLowerCase() ===
                            "Confirmed".toLocaleLowerCase() &&
                          "border-[#D4AF37] text-[#D4AF37]"
                        }`}
                      >
                        {" "}
                        {booking.condition}
                      </p>
                    </td>

                    <td className="p-4 border-x border-slate-200">
                      <div className="flex flex-col items-center gap-2 min-w-[120px]">
                        <button
                          onClick={() => {
                            handleConfirmationBooking(booking.bookingNumber);
                          }}
                          className="bg-yellow-400 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-pen"></i> confirmation
                        </button>
                        <button
                          onClick={() => {
                            setBookingNumber(booking.bookingNumber);
                            setIsOpen(true);
                            refetchBookingDetails();
                          }}
                          className="bg-blue-500 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-eye"></i> Show details
                        </button>
                        <button
                          onClick={() => {
                            handleCancelationBooking(booking.bookingNumber);
                          }}
                          className="bg-red-600 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                        >
                          <i className="fas fa-trash"></i> Cancellation
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="py-5 text-center text-[25px] font-bold text-red-600">
              No Bookings Found 🥱
            </h2>
          )}
        </div>
        {/* CARD view for mobile screens */}
        <div className="block md:hidden">
          {isLoading ? (
            <LoaderDashboard />
          ) : BookingData.length > 0 ? (
            <div className="grid gap-4">
              {data?.data?.map((booking: Booking) => (
                <div
                  key={booking.bookingNumber}
                  className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden"
                >
                  <div className="p-5">
                    <h2 className="font-semibold text-lg text-slate-800 mb-2">
                      Booking #{booking.bookingNumber}
                    </h2>
                    <p className="text-base text-slate-600 mb-1">
                      <i className="fas fa-user mr-2 text-slate-500"></i>
                      {booking.customerName}
                    </p>
                    <p className="text-sm text-slate-500 mb-1">
                      <i className="fas fa-bed mr-2 text-slate-500"></i>
                      {booking.roomType}
                    </p>
                    <p className="text-sm text-slate-500 mb-1">
                      <i className="fas fa-calendar-alt mr-2 text-slate-500"></i>
                      Arrival: {dayjs(booking.arrivalDate).format("DD/MM/YYYY")}
                    </p>
                    <p className="text-sm text-slate-500 mb-3">
                      <i className="fas fa-calendar-alt mr-2 text-slate-500"></i>
                      Departure:{" "}
                      {dayjs(booking.departureDate).format("DD/MM/YYYY")}
                    </p>

                    <p
                      className={`px-4 py-[7px] border cursor-pointer rounded-[12px] font-medium inline-block text-sm
                ${
                  booking.condition.toLowerCase() === "pending"
                    ? "border-[#2ECC71] text-[#2ECC71] bg-[#2ECC7110]"
                    : booking.condition.toLowerCase() === "cancelled"
                    ? "border-[#F12525] text-[#F12525] bg-[#F1252510]"
                    : booking.condition.toLowerCase() === "confirmed"
                    ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF3710]"
                    : "border-gray-300 text-gray-600"
                }`}
                    >
                      {booking.condition}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          handleConfirmationBooking(booking.bookingNumber);
                        }}
                        className="bg-yellow-400 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                      >
                        <i className="fas fa-pen"></i> confirmation
                      </button>
                      <button
                        onClick={() => {
                          setBookingNumber(booking.bookingNumber);
                          setIsOpen(true);
                          refetchBookingDetails();
                        }}
                        className="bg-blue-500 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                      >
                        <i className="fas fa-eye"></i> Show details
                      </button>
                      <button
                        onClick={() => {
                          handleCancelationBooking(booking.bookingNumber);
                        }}
                        className="bg-red-600 text-white w-full p-2 rounded-md flex items-center justify-center gap-2 font-bold hover:opacity-90"
                      >
                        <i className="fas fa-trash"></i> Cancellation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="py-5 text-center text-[20px] font-bold text-red-600">
              No Bookings Found 🥱
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

export default ReservationTable;
