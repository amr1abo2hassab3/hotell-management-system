import img from "../../../assets/images/Paris.jpg";
import imgicon from "../../../assets/images/user-plus.png";
import { ServiceType } from "../../../interfaces/srvicesTypes";

interface CardServiceProps {
  service: ServiceType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CardService = ({
  service,
  setIsOpen,
  setServiceId,
}: CardServiceProps) => {
  return (
    <div className="relative flex flex-col gap-4 p-4 rounded overflow-hidden min-h-[358px] justify-between w-full bg-cover bg-center">
      <div
        className="absolute inset-0 opacity-35 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${service.backgroundImage || img})` }}
      ></div>

      <div className="flex text-white flex-col gap-4 text-[16px] font-medium relative z-10">
        <div className="w-[32px] h-[43px]">
          <img
            src={service.iconImage || imgicon}
            alt={service.serviceDescription}
            className="w-full h-full"
          />
        </div>
        <h2>{service.serviceName}</h2>
        <h3>
          Price:{" "}
          <span className="font-bold text-[#d4af37]">
            ${service.servicePrice}
          </span>{" "}
          per person.
        </h3>
        <p className="text-[14px]">{service.serviceDescription}</p>
      </div>

      <button
        onClick={() => {
          setIsOpen(true);
          setServiceId(service.serviceId);
        }}
        className="relative z-10 w-[264px] h-[32px] bg-[#C4A484] text-white text-[14px] font-bold rounded"
      >
        Add with reservation
      </button>
    </div>
  );
};

export default CardService;
