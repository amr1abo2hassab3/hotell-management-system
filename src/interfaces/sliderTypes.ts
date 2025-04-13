export type SliderSettings = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  autoplay: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  fade: boolean;
  cssEase: string;
};
export type SliderImagesProps = {
  settings: SliderSettings;
  images: string[];
  formComponent?: React.ReactNode;
  TextSlider?: React.ReactNode;
};