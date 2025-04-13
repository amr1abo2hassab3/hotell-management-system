import HotelsImg from "../../../assets/images/hotels.jpg";
import ApartmentsImg from "../../../assets/images/Apartments.jpg";
import ResortsImg from "../../../assets/images/Resorts.jpg";
import VillasImg from "../../../assets/images/Villas.jpg";
import CottagesImg from "../../../assets/images/Cottages.jpg";
import { Link } from "react-router-dom";

interface PropertiesObject {
  name: string;
  image: string;
}
const properties: PropertiesObject[] = [
  { name: "Hotels", image: HotelsImg },
  { name: "Apartments", image: ApartmentsImg },
  { name: "Resorts", image: ResortsImg },
  { name: "Villas", image: VillasImg },
  { name: "Cottages", image: CottagesImg },
];

const ProberityTypeContent = () => {
  return (
    <Link
      to={"/room"}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[8px] mt-9"
    >
      {properties.map((property) => (
        <div
          key={property.name}
          className="text-center flex-col flex gap-[4px]"
        >
          <h2
            style={{
              backgroundImage: "linear-gradient(to bottom, #252525, #6A6A6A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="capitalize text-[25px] font-semibold"
          >
            {property.name}
          </h2>
          <div className="rounded-[16px] overflow-hidden">
            <img
              className="object-cover w-full"
              src={property.image}
              alt="Hotels"
            />
          </div>
        </div>
      ))}
    </Link>
  );
};

export default ProberityTypeContent;
