import dayjs from "dayjs";
import LoaderScreen from "../../website/LoaderScreen/LoaderScreen";

export interface Service {
  serviceName: string;
  quantity: number;
  price: number;
}

export interface Booking {
  bookingId: number;
  roomName: string;
  customerName: string;
  arrivalDate: string | null;
  departureDate: string | null;
  numberOfGuests: number | null;
  totalPrice: number;
  bookingCondition: string;
  services: Service[];
}
type BookingDetailsDashboardProps = {
  bookingData: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  roomId: number;
  isLoadingDetails: boolean;
};

const BookingDetailsDashboard = ({
  bookingData,
  isOpen,
  onClose,
  isLoadingDetails,
}: BookingDetailsDashboardProps) => {
  if (isLoadingDetails) return <LoaderScreen />;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${
        isOpen
          ? "opacity-100 scale-100 animate-fade-in"
          : "opacity-0 scale-90 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Booking Details #{bookingData?.bookingId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-circle-xmark text-[25px]"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Room & Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Room Name:</span>
                <span className="font-medium">{bookingData?.roomName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">{bookingData?.customerName}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-medium">
                  {bookingData?.numberOfGuests}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Total Price:</span>
                <span className="font-medium">${bookingData?.totalPrice}</span>
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex justify-between">
              <span className="text-gray-600">Arrival:</span>
              <span className="font-medium">
                {dayjs(bookingData?.arrivalDate).format("DD/MM/YYYY")}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Departure:</span>
              <span className="font-medium">
                {dayjs(bookingData?.departureDate).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="flex justify-between items-center">
              <span className="text-gray-600">Booking Status:</span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  bookingData?.bookingCondition === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : bookingData?.bookingCondition === "Pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {bookingData?.bookingCondition}
              </span>
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Services
            </h3>
            {bookingData?.services?.length ? (
              <ul className="space-y-2">
                {bookingData?.services?.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <i className="fa-solid fa-check text-green-600"></i>
                    <span>{service.serviceName}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No services added</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsDashboard;
