import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl, booking, payment } from "../../../Api/Api";
import { FaCreditCard, FaPaypal } from "react-icons/fa";

const FormBookingUser = () => {
  const { bookingId } = useContext(AuthContext);

  const handlePaymentMethode = async (paymentMethod: string) => {
    if (bookingId.bookingId) {
      try {
        const { data } = await toast.promise(
          axios.post(`${baseUrl}${booking}${bookingId.bookingId}/${payment}`, {
            paymentMethod: paymentMethod,
          }),
          {
            pending: "Sending Data...",
            success: "Data sent successfully. Go to the next step!",
            error: "Failed to send data",
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
        await window.open(data?.paymentUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6  rounded-2xl shadow-2xl max-w-md mx-auto">
      <h2 className="text-white text-2xl font-bold border-b border-gray-600 pb-3">
        Select Payment Method
      </h2>

      <button
        onClick={() => handlePaymentMethode("CreditCard")}
        className="w-full flex items-center gap-3 justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
      >
        <FaCreditCard className="w-5 h-5" /> Pay with Credit Card
      </button>

      <button
        onClick={() => handlePaymentMethode("PayPal")}
        className="w-full flex items-center gap-3 justify-center bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
      >
        <FaPaypal className="w-5 h-5" /> Pay with PayPal
      </button>
    </div>
  );
};

export default FormBookingUser;
