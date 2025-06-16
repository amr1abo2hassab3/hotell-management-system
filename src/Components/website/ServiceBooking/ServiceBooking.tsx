type ServiceBookingProps = {
  index: number;
  servicesName: string;
  Price: number;
};

const ServiceBooking = ({
  index,
  servicesName,
  Price,
}: ServiceBookingProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[10px]">
        <div className="bg-[#ECF0F1] text-[#7C8493] w-[37px] h-[37px] rounded-full flex items-center justify-center">
          {index + 1}
        </div>
        <h3 className="capitalize font-medium text-[#0F1A24] text-[20px]">
          {servicesName}
        </h3>
      </div>
      <div>
        <span className="font-bold text-[#2C3E50] text-[20px]">{Price}</span>
      </div>
    </div>
  );
};

export default ServiceBooking;
