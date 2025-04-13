import imgOffers from "../../../assets/images/specialOffers.jpg";
import ProberityType from "../ProberityType/ProberityType";
import ProberityTypeContent from "../ProberityTypeContent/ProberityTypeContent";

interface OffersObject {
  title: string;
  discount: string;
  description: string;
}

const offers: OffersObject[] = [
  {
    title: "For early bookings",
    discount: "30%",
    description:
      "For reservations made one month prior to arrival date, with free breakfast for the first day.",
  },
  {
    title: "Loyalty Program",
    discount: "10%",
    description:
      "For regular guests with a special welcome, room upgrade upon availability, and a discount on future stays.",
  },
  {
    title: "For extended stays",
    discount: "25%",
    description:
      "Over 7 nights, includes additional services such as daily housekeeping and free minibar.",
  },
  {
    title: "Honeymoon Package",
    discount: "20%",
    description:
      "Stay in a honeymoon suite with romantic dinner and room decoration, plus complimentary breakfast.",
  },
];
const SpecialOffers = () => {
  return (
    <div className="container mx-auto flex-col flex gap-[18px] mt-16">
      <div>
        <h2 className="text-[32px] font-bold">
          Special <span className="text-[#D4AF37]">offers for you</span>
        </h2>
        <p className="mt-[18px] text-[#7C8493] text-[16px]">
          Lots of discounts to make your vacation more economical.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="w-full relative rounded-[8px] overflow-hidden"
          >
            <img
              src={imgOffers}
              alt="offers"
              className="w-full h-auto object-cover"
            />
            <div className="bg-[#986D3C] z-10 felx flex-col gap-[12px] absolute w-1/2 h-full top-0 left-0 opacity-[70%] px-4 pt-[32px] pb-[16px]">
              <h3 className="font-bold  text-white text-[18px]">
                {offer.title}{" "}
              </h3>
              <h4 className="text-[#F1C40F] text-[42px] font-semibold">
                {offer.discount}
              </h4>
              <p className="text-[12px] font-medium text-white">
                {offer.description.length > 20
                  ? `${offer.description.slice(0, 20)}...`
                  : offer.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ProberityType />
      <ProberityTypeContent />
    </div>
  );
};

export default SpecialOffers;
