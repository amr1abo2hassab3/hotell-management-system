import axios from "axios";
import AllRooms from "../../../Components/website/AllRooms/AllRooms";
import CheckBoxForm from "../../../Components/website/CheckBoxForm/CheckBoxForm";
import FormDate from "../../../Components/website/FormDate/FormDate";
import SliderImages from "../../../Components/website/SliderImages/SliderImages";
import TextSliderRoom from "../../../Components/website/TextSliderRoom/TextSliderRoom";
import img1 from "../../../assets/images/sliderroom.jpg";
import img2 from "../../../assets/images/sliderroom.jpg";
import img3 from "../../../assets/images/sliderroom.jpg";
import { baseUrl, roomFilter } from "../../../Api/Api";
import { useContext, useState } from "react";
import LoaderScreen from "../../../Components/website/LoaderScreen/LoaderScreen";
import { RoomsResponse } from "../../../interfaces/roomTypes";
import { AuthContextProps } from "../../../interfaces/authTypes";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

const images: string[] = [img1, img2, img3, img3];

interface DataPayloadType {
  minPrice?: number | null;
  maxPrice?: number | null;
  roomTypeIds?: number[];
  serviceIds?: number[];
  classificationLevels?: number[];
}

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

const Room: React.FC = () => {
  const { userData } = useContext<AuthContextProps>(AuthContext);

  const [price, setPrice] = useState<number>(0);
  const [roomTypeIds, setRoomTypeIds] = useState<number[]>([]);
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [classification, setClassification] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const fetchRooms = async (): Promise<RoomsResponse> => {
    let minPrice = null;
    let maxPrice = null;

    if (price === 1) {
      minPrice = 0;
      maxPrice = 200;
    } else if (price === 2) {
      minPrice = 200;
      maxPrice = 500;
    } else if (price === 3) {
      minPrice = 500;
      maxPrice = 1000;
    } else if (price === 4) {
      minPrice = 1000;
      maxPrice = 2000;
    } else if (price === 5) {
      minPrice = 2000;
      maxPrice = 5000;
    }

    let dataPayload: DataPayloadType = {};
    if (
      price !== 0 ||
      roomTypeIds.length > 0 ||
      serviceIds.length > 0 ||
      classification.length > 0
    ) {
      dataPayload = {
        minPrice,
        maxPrice,
        roomTypeIds,
        serviceIds,
        classificationLevels: classification,
      };
    }

    const res = await axios.post(
      `${baseUrl}${roomFilter}?pageNumber=${pageNumber}`,
      dataPayload,
      {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      }
    );
    return res.data;
  };

  const { data, isLoading, isError } = useQuery<RoomsResponse>({
    queryKey: [
      "getAllRooms",
      pageNumber,
      price,
      roomTypeIds,
      serviceIds,
      classification,
    ],
    queryFn: fetchRooms,
    enabled: !!userData?.token,
  });

  if (isLoading) return <LoaderScreen />;

  return (
    <div className="bg-[#000000]">
      <SliderImages
        images={images}
        settings={settings}
        TextSlider={<TextSliderRoom />}
      />
      <FormDate />
      <CheckBoxForm
        price={price}
        setPrice={setPrice}
        roomTypeIds={roomTypeIds}
        setRoomTypeIds={setRoomTypeIds}
        serviceIds={serviceIds}
        setServiceIds={setServiceIds}
        classification={classification}
        setClassification={setClassification}
      />
      <AllRooms
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        dataRooms={data}
        isError={isError}
      />
    </div>
  );
};

export default Room;
