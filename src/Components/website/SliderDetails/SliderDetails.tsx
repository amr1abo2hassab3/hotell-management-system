import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import logo from "../../../assets/images/logoDtails.jpg";
import imgHotell from "../../../assets/images/hotellimg.jpg";
import img1 from "../../../assets/images/detailsimg.jpg";

type HotelCard = {
  title: string;
  image: string;
};

const hotelCards: HotelCard[] = [
  {
    title: "Luxury Hotel",
    image: imgHotell,
  },
  {
    title: "Sea View Hotel",
    image: img1,
  },
  {
    title: "Sea View Hotel",
    image: img1,
  },
  {
    title: "Sea View Hotel",
    image: img1,
  },
];

const SliderDetails = () => {
  return (
    <>
      <div className="w-[267px] h-[152px]">
        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
      </div>

      {/* Desktop Vertical Swiper */}
      <div className="hidden lg:flex flex-col max-h-[694px] w-full overflow-hidden px-2 mt-9">
        <Swiper
          direction="vertical"
          spaceBetween={20}
          slidesPerView="auto"
          mousewheel
          modules={[Mousewheel]}
          className="scrollDetails"
          style={{ height: "100%" }}
        >
          {hotelCards.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center">
                <h2 className="text-[#6A6A6A] mb-2 text-[32px] text-center font-medium capitalize">
                  {card.title}
                </h2>
                <div className="w-[240px] h-[287px] rounded-[15px] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Horizontal Swiper */}
      <div className="lg:hidden w-full overflow-hidden px-2 mt-9">
        <Swiper
          direction="horizontal"
          spaceBetween={12}
          slidesPerView={"auto"}
          navigation
          modules={[Navigation]}
        >
          {hotelCards.map((card, i) => (
            <SwiperSlide key={i} style={{ width: "260px" }}>
              <div className="flex flex-col items-center">
                <h2 className="text-[#6A6A6A] mb-2 text-[20px] text-center font-medium capitalize">
                  {card.title}
                </h2>
                <div className="w-[240px] h-[287px] rounded-[15px] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SliderDetails;
