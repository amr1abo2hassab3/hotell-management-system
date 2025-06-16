import MyReservationTable from "../../../Components/website/MyReservationTable/MyReservationTable";

const MyReservations = () => {
  return (
    <div className="md:p-[32px] flex flex-col gap-4">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[#202430] text-[24px] font-bold capitalize">
            Reservations
          </h1>
          <p className="text-[#ABADB7] text-[16px] font-bold">
            View your current and past bookings with Al Hado'a Hotel. Here you
            can manage all your bookings and make any necessary changes.
          </p>
        </div>
      </div>
      <div className=" shadow-md rounded-lg">
        {" "}
        <MyReservationTable />{" "}
      </div>
    </div>
  );
};

export default MyReservations;
