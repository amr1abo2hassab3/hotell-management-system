import AllServices from "../../../Components/website/AllServices/AllServices";
import SliderImages from "../../../Components/website/SliderImages/SliderImages";
import TextSliderServices from "../../../Components/website/TextSliderServices/TextSliderServices";
import img1 from "../../../assets/images/sliderServices.jpg";
import img2 from "../../../assets/images/sliderServices.jpg";
import img3 from "../../../assets/images/sliderServices.jpg";
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
const images: string[] = [img1, img2, img3, img3];

const Services: React.FC = () => {
  return (
    <div className="bg-[#000000]">
      <SliderImages
        images={images}
        settings={settings}
        TextSlider={<TextSliderServices />}
      />
      <AllServices />
    </div>
  );
};

export default Services;
