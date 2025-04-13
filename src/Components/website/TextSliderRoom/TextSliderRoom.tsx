import lineImage from "../../../assets/images/linesimg-removebg-preview.png";

const TextSliderRoom = () => {
  return (
    <div className="my-12 flex flex-col gap-8 sm:gap-10 md:gap-16 lg:gap-20">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-bold text-[#EBEDF0] leading-tight sm:leading-snug md:leading-snug">
        Find the perfect room{" "}
        <span className="text-[#D4AF37] relative inline-block">
          for your stay
          <img
            src={lineImage}
            alt="line"
            className="absolute right-0 mt-2 sm:mt-3 md:mt-4 w-3/4 sm:w-full"
          />
        </span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-semibold text-[#EBEDF0] max-w-4xl">
        Discover a range of rooms and suites designed to provide the ultimate in
        comfort and luxury, and choose what suits your needs for an
        unforgettable stay experience.
      </p>
    </div>
  );
};

export default TextSliderRoom;
