import { useFormik } from "formik";
import { RoomType } from "../../../interfaces/roomTypes";
import { addBooking, baseUrl, booking, roomTypes } from "../../../Api/Api";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetAllServices from "../../../customHooks/useGetAllServices";
import { toast } from "react-toastify";
import LoaderScreen from "../../website/LoaderScreen/LoaderScreen";
import { useState } from "react";

type AddNewBookingProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

type ValuesForm = {
  customerName: string;
  roomTypeId: number;
  arrivalDate: string;
  departureDate: string;
  numberOfGuests: number;
  status: string;
  services: number[];
};

const AddNewBooking = ({ setIsOpen, isOpen }: AddNewBookingProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleClose = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  const formik = useFormik<ValuesForm>({
    initialValues: {
      customerName: "",
      roomTypeId: 0,
      arrivalDate: "",
      departureDate: "",
      numberOfGuests: 0,
      status: "",
      services: [],
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await toast.promise(
          axios.post(`${baseUrl}${booking}${addBooking}`, values),
          {
            pending: "Adding Booking...",
            success: "Booking has been Created successfully",
            error: "Failed to Create New Booking",
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

        await queryClient.invalidateQueries({
          queryKey: ["getAllCurrentBooking"],
        });
        handleClose();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleServiceToggle = (serviceId: number) => {
    const services = formik.values.services;
    const isSelected = services.includes(serviceId);
    formik.setFieldValue(
      "services",
      isSelected
        ? services.filter((id) => id !== serviceId)
        : [...services, serviceId]
    );
  };

  const { data: dataRoomTypes, isLoading: isLoadingRoomTypes } = useQuery<
    RoomType[]
  >({
    queryKey: ["getAllTypeRoom"],
    queryFn: () => axios.get(`${baseUrl}${roomTypes}`).then((res) => res.data),
  });

  const { data: servicesData, isLoading: isLoadingServices } =
    useGetAllServices();

  if (isLoadingRoomTypes || isLoadingServices) return <LoaderScreen />;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "opacity-100 scale-100 animate-fade-in"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className="mx-auto w-full md:w-[626px] max-h-[90vh] overflow-auto bg-white p-8 rounded-lg shadow-lg bg-opacity-60 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#202430]">
            {" "}
            Add New Booking
          </h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-600 hover:text-gray-800  transition-all duration-200"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Customer Name */}
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter customer Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Room Type */}
          <div>
            <label
              htmlFor="roomTypeId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Type
            </label>
            <select
              id="roomTypeId"
              name="roomTypeId"
              value={formik.values.roomTypeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select room type</option>
              {dataRoomTypes?.map((type) => (
                <option key={type.roomTypeId} value={type.roomTypeId}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          {/* arrival Date */}
          <div>
            <label
              htmlFor="arrivalDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Arrive Date
            </label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              value={formik.values.arrivalDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Arrive Date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Departure Date  */}
          <div>
            <label
              htmlFor="departureDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formik.values.departureDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Departure Date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Number of Guests */}
          <div>
            <label
              htmlFor="numberOfGuests"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Guests
            </label>
            <input
              type="number"
              id="numberOfGuests"
              name="numberOfGuests"
              value={formik.values.numberOfGuests}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Number of Guests"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Services
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
              {servicesData?.map((service) => (
                <div key={service.serviceId} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${service.serviceId}`}
                    checked={formik.values.services.includes(service.serviceId)}
                    onChange={() => handleServiceToggle(service.serviceId)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`service-${service.serviceId}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {service.serviceName}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Room Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Choose status</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Confirmed">Confirmed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#C4A484] text-white rounded-md hover:bg-[#a06427] focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-[#C4A484]"
            >
              {isLoading ? (
                <>
                  {" "}
                  <i className="fa fa-spinner fa-spin mr-2"></i>
                  Creating Booking...
                </>
              ) : (
                "Create New Booking"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBooking;
