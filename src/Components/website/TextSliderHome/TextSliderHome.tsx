const TextSliderHome: React.FC = () => {
  return (
    <div className="mt-12">
      {" "}
      <div className="">
        <h1
          className="font-medium text-[50px] md:text-[70px] lg:text-[108px] max-w-[1000px]  text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #CCCCCC 77%)",
          }}
        >
          Explore your place to stay
        </h1>
      </div>
      <div className="flex lg:justify-end mt-4">
        <h2 className="text-white font-bold text-[25px] md:text-[30px] lg:text-[36px] max-w-[480px] ">
          We provide a variety of the best lodging accommodations for those of
          you who need it.{" "}
          <span className=" text-[18px] relative">
            Don’t worry about the quality of the service.
          </span>
        </h2>
      </div>
    </div>
  );
};

export default TextSliderHome;
