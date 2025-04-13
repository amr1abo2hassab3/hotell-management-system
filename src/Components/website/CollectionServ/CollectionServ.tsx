import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../../assets/images/Rectangle 6.jpg";
import img2 from "../../../assets/images/Rectangle 9.jpg";
import img3 from "../../../assets/images/Rectangle 11.jpg";
import img4 from "../../../assets/images/Service & Facilities.jpg";

interface ServiceItem {
  img: string;
  title: string;
}

const services: ServiceItem[][] = [
  [{ img: img1, title: "Rooms" }],
  [
    { img: img4, title: "Dining" },
    { img: img4, title: "Service & Facilities" },
  ],
  [
    { img: img2, title: "Conferences & Meetings" },
    { img: img3, title: "Wedding Package" },
  ],
];

export const CollectionServ: React.FC = () => {
  return (
    <div className="container mx-auto my-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((group, index) => (
        <Link
          key={index}
          className={`min-h-[760px] bg-cover bg-center overflow-hidden relative ${
            group.length > 1 ? "flex flex-col gap-8" : "rounded-[42px]"
          }`}
          to="/services"
          aria-label={group.map((item) => item.title).join(", ")}
        >
          {group.map((item, subIndex) => (
            <div
              key={subIndex}
              className={`relative rounded-[42px] flex overflow-hidden`}
            >
              <img src={item.img} alt={item.title} className="w-full h-full" />
              <h2 className="capitalize text-[36px] font-bold text-white absolute bottom-10 left-1/2 -translate-x-1/2">
                {item.title}
              </h2>
            </div>
          ))}
        </Link>
      ))}
    </div>
  );
};
