import { SliderImagesProps } from "../../../interfaces/sliderTypes";

import Slider from "react-slick";

const SliderImages = ({
  settings,
  images,
  TextSlider,
  formComponent,
}: SliderImagesProps) => {
  return (
    <Slider {...settings} className="md:h-screen">
      {images.map((img: string, index: number) => (
        <div
          key={index}
          className="relative md:h-screen w-full  overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${img})` }}
          />
          <div className="container mx-auto relative z-10 ">{TextSlider}</div>
          {formComponent}
        </div>
      ))}
    </Slider>
  );
};

export default SliderImages;
