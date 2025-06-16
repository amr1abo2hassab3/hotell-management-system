import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, occupancyRate } from "../../../Api/Api";
import LoaderScreen from "../../website/LoaderScreen/LoaderScreen";

interface DataResponseType {
  occupancyRate: number;
  reservedPercentage: number;
  notBookedPercentage: number;
}

const OccupancyRate = () => {
  const [data, setData] = useState<DataResponseType>({
    occupancyRate: 0,
    reservedPercentage: 0,
    notBookedPercentage: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}${occupancyRate}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <LoaderScreen />;
  return (
    <div className="px-[32px] py-[16px] border border-[#D6DDEB] flex flex-col items-center justify-center gap-3">
      <h2 className="text-[18px] font-medium text-[#202430]">
        Room occupancy rate
      </h2>

      <div className="flex gap-[34px] items-center">
        <div
          className="w-[147px] h-[147px] relative rounded-full flex items-center justify-center text-[48px] font-bold text-white"
          style={{
            background: `conic-gradient(#8B6B4E 0% ${data.occupancyRate}%, #C4A484 0% 100%)`,
          }}
        >
          <div className="absolute inset-[14px] bg-white rounded-full flex justify-center items-center">
            <span className="z-10 text-[#2ECC71] text-[35px]">
              {data.occupancyRate}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-[#8B6B4E] rounded"></div>
            <div>
              <h4 className="text-[16px] font-semibold text-[#202430]">
                {data.reservedPercentage}%
              </h4>
              <p className="text-[14px] font-semibold text-[#7C8493]">
                Reserved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-[#C4A484] rounded"></div>
            <div>
              <h4 className="text-[16px] font-semibold text-[#202430]">
                {data.notBookedPercentage}%
              </h4>
              <p className="text-[14px] font-semibold text-[#7C8493]">
                Not booked
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyRate;
