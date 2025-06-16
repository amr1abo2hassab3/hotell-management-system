import { CollectionServ } from "../../../Components/website/CollectionServ/CollectionServ";
import FeaturedRooms from "../../../Components/website/FeaturedRooms/FeaturedRooms";
import SliderImages from "../../../Components/website/SliderImages/SliderImages";
import SpecialOffers from "../../../Components/website/SpecialOffers/SpecialOffers";
import TextSliderHome from "../../../Components/website/TextSliderHome/TextSliderHome";
import img1 from "../../../assets/images/pexels-jvdm-1457842.jpg";
import img2 from "../../../assets/images/pexels-jvdm-1457842.jpg";
import img3 from "../../../assets/images/pexels-jvdm-1457842.jpg";

const images: string[] = [img1, img2, img3, img3];

const Home: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
  };
  return (
    <div className="bg-[#D9D9D9] pb-14">
      <SliderImages
        images={images}
        settings={settings}
        TextSlider={<TextSliderHome />}
      />

      <CollectionServ />
      <FeaturedRooms />
      <SpecialOffers />
    </div>
  );
};

export default Home;
