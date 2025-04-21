import ContactForm from "../../../Components/website/ContactForm/ContactForm";
import FeaturedRooms from "../../../Components/website/FeaturedRooms/FeaturedRooms";
import SliderImages from "../../../Components/website/SliderImages/SliderImages";
import SpecialOffers from "../../../Components/website/SpecialOffers/SpecialOffers";
import TextSliderServices from "../../../Components/website/TextSliderServices/TextSliderServices";
import img1 from "../../../assets/images/contactImage.jpg";
const images: string[] = [img1, img1, img1, img1];

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
const ContactUs: React.FC = () => {
  return (
    <div>
      {" "}
      <SliderImages
        images={images}
        settings={settings}
        TextSlider={<TextSliderServices />}
      />
      <ContactForm />
      <div className="my-10">
        <FeaturedRooms />
      </div>
      <div className="my-10">
        <SpecialOffers />
      </div>
    </div>
  );
};

export default ContactUs;
