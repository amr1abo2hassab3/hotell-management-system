import FooterBottom from "../FooterBottom/FooterBottom";
import FooterTop from "../FooterTop/FooterTop";

const Footer = () => {
  return (
    <div className="">
      <div className=" bg-[#252525]">
        <div className="container mx-auto py-14">
          <FooterTop />
        </div>
      </div>
      <div className="bg-[#1D1D1D]">
        <div className="container mx-auto py-14">
          <FooterBottom />
        </div>
      </div>
    </div>
  );
};

export default Footer;
