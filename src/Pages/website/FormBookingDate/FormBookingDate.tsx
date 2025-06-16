import axios from "axios";
import AddServicesQuantity from "../AddServicesQuantity/AddServicesQuantity";
import * as Yup from "yup";
import { baseUrl, booking } from "../../../Api/Api";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useFormik } from "formik";
import { FormDateType } from "../../../interfaces/BookingFormDateType";
import { Service } from "./../../../interfaces/roomTypes";
import { toast } from "react-toastify";

interface FormBookingDateProps {
  services: Service[];
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  isSuccess: boolean;
}

const FormBookingDate = ({
  services,
  isSuccess,
  setIsSuccess,
}: FormBookingDateProps) => {
  const { bookingId } = useContext(AuthContext);

  const handleBookingDate = async (values: FormDateType) => {
    try {
      toast.promise(
        axios.put(`${baseUrl}${booking}${bookingId.bookingId}/dates`, values),
        {
          pending: "Sending Data...",
          success: "Data has been Sended successfully Go To The Next Step",
          error: "Failed to Send Data",
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
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik<FormDateType>({
    initialValues: {
      arrivalDate: "",
      departureDate: "",
      numberOfGuests: 1,
    },
    onSubmit: handleBookingDate,
    validationSchema: Yup.object({
      arrivalDate: Yup.string().required("arrival Date is required "),
      departureDate: Yup.string().required("departure Date is required "),
      numberOfGuests: Yup.number().required("number Of Guests is required "),
    }),
  });

  return (
    <div className="flex gap-[32px] flex-col">
      <form className="flex gap-[32px] flex-col" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <label
            className="block text-[#F6F6F6] font-semibold text-[18px] mb-2"
            htmlFor="arrivalDate"
          >
            When is the booking date?{" "}
          </label>
          <input
            value={formik.values.arrivalDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="date"
            id="arrivalDate"
            className="w-full cursor-pointer px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A484]"
          />
          {formik.touched.arrivalDate && formik.errors.arrivalDate && (
            <p className="text-red-500 text-sm py-2 font-semibold">
              {formik.errors.arrivalDate}
            </p>
          )}
        </div>
        <div className="w-full">
          <label
            className="block text-[#F6F6F6] font-semibold text-[18px] mb-2"
            htmlFor="departureDate"
          >
            When does the reservation end?{" "}
          </label>
          <input
            value={formik.values.departureDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="date"
            id="departureDate"
            className="w-full cursor-pointer px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A484]"
          />
          {formik.touched.departureDate && formik.errors.departureDate && (
            <p className="text-red-500 text-sm py-2 font-semibold">
              {formik.errors.departureDate}
            </p>
          )}
        </div>
        <div className="w-full">
          <label
            className="block text-[#F6F6F6] font-semibold text-[18px] mb-2"
            htmlFor="numberOfGuests"
          >
            Please enter the number of guests
          </label>
          <input
            value={formik.values.numberOfGuests}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            id="numberOfGuests"
            placeholder="Please enter the number of guests"
            className="w-full cursor-pointer px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A484]"
          />
          {formik.touched.numberOfGuests && formik.errors.numberOfGuests && (
            <p className="text-red-500 text-sm py-2 font-semibold">
              {formik.errors.numberOfGuests}
            </p>
          )}
        </div>
        {!isSuccess && (
          <button
            type="submit"
            className="bg-[#C4A484] text-white px-[16px] py-[12px] rounded-[50px]"
          >
            Send Data
          </button>
        )}
      </form>
      <AddServicesQuantity services={services} />
    </div>
  );
};

export default FormBookingDate;
