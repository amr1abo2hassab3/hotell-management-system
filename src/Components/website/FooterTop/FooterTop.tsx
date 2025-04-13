import { Link } from "react-router-dom";
import imgLogo from "../../../assets/images/logo.jpg";
import DubaiImg from "../../../assets/images/Dubai.jpg";
import TbilisiImg from "../../../assets/images/Tbilisi.jpg";
import TaiwanImg from "../../../assets/images/Tbilisi.jpg";
import ParisImg from "../../../assets/images/Paris.jpg";
import IstanbulImg from "../../../assets/images/Istanbul.jpg";

interface CardFooterTopObject {
  img: string;
  title: string;
}

const dataCardLeft: CardFooterTopObject[] = [
  { img: DubaiImg, title: "Dubai" },
  { img: TbilisiImg, title: "Tbilisi" },
  { img: TaiwanImg, title: "Taiwan" },
];
const dataCardRight: CardFooterTopObject[] = [
  { img: ParisImg, title: "Paris" },
  { img: IstanbulImg, title: "Istanbul" },
];

import CardFooterTop from "../CardFooterTop/CardFooterTop";
const FooterTop = () => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between">
      <div className="lg:w-[60%] w-full">
        <div className="lg:w-3/4">
          {" "}
          <h2 className="text-[#F6F6F6] text-center font-bold text-[40px]">
            Stay in the know
          </h2>
          <p className="text-[30px] text-[#CCCCCC] mt-4 ml-6">
            Sign up to get marketing emails from Bookme.com,including
            promotions, rewards, travel experiences,and information about
            Bookme.com and Booking.com Transport Limited’s products and
            services.
          </p>
        </div>
        <div className="flex lg:justify-end justify-center mt-14">
          <button className="bg-[#C49C74] text-[#252525] text-[20px] w-[198px] h-[70px] rounded-[12px]">
            {" "}
            Subscribe
          </button>
        </div>
        <div className="mt-16 flex flex-col justify-center items-center lg:items-start">
          <p className="text-[#C49C74] text-[18px]">
            You can opt out anytime. See our{" "}
            <Link to={"/"} className="text-[#C49C74] link-underline">
              privacy statement.
            </Link>
          </p>
          <img className="mt-6 w-[215px]" src={imgLogo} alt="logo" />
        </div>
      </div>
      <div className="lg:w-[9px] w-full  rounded-[100px] bg-[#202226] shadow-[-2_-2px_-2px_rgba(0,0,0,0.50)]">
        <div className="w-full h-full"></div>
      </div>
      <div className="lg:w-[35%] w-full text-center flex flex-col justify-between">
        <div className="mb-10">
          {" "}
          <h2 className="text-[40px] font-bold text-white">
            Trending destinations
          </h2>
          <p className="text-[18px] text-[#CCCCCC]">
            {" "}
            Most popular choices for travelers from Iran
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-4">
            {dataCardLeft.map((item: CardFooterTopObject) => (
              <CardFooterTop item={item} key={item.title} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {dataCardRight.map((item: CardFooterTopObject) => (
              <CardFooterTop item={item} key={item.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
