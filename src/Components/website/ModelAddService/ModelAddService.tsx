import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { MyBooking } from "../../../interfaces/bookingDashbard";
import { toast } from "react-toastify";

interface ModelAddServiceProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceId: React.Dispatch<React.SetStateAction<number | null>>;
  serviceId: number | null;
}

const ModelAddService = ({
  isOpen,
  setIsOpen,
  setServiceId,
  serviceId,
}: ModelAddServiceProps) => {
  const { userData } = useContext(AuthContext);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [quantity, setQuantity] = useState("");

  const onClose = () => {
    setIsOpen(false);
    setServiceId(null);
  };

  const handleGetAllMyBookings = async () => {
    if (userData?.id) {
      const res = await axios.get(
        `https://hotellapp.runasp.net/api/Users/${userData.id}/Userbookings`
      );
      return res.data;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["myBookings", userData?.id],
    queryFn: handleGetAllMyBookings,
    enabled: !!userData?.id,
  });

  const handleSubmit = async () => {
    try {
      toast.promise(
        axios.post(
          `https://hotellapp.runasp.net/api/Booking/${selectedBooking}/select-services`,
          [
            {
              serviceId: serviceId,
              quantity: quantity,
            },
          ]
        ),
        {
          pending: "Adding Service...",
          success: "Service has been Added successfully",
          error: "Failed to Add Service",
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
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${
        isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      } transition-all duration-300`}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Add Service</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>

        {/* Booking Number Select */}
        <div>
          <label
            htmlFor="bookings"
            className="block mb-1 font-medium text-gray-700"
          >
            Select Booking Number
          </label>
          <select
            id="bookings"
            value={selectedBooking}
            onChange={(e) => setSelectedBooking(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a booking</option>
            {data?.map((booking: MyBooking) => (
              <option key={booking.bookingId} value={booking.bookingId}>
                {booking.bookingId}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div>
          <label
            htmlFor="quantity"
            className="block mb-1 font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedBooking || !quantity}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ModelAddService;
