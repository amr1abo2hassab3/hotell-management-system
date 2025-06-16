import { HomeDashboardData } from "../../../Pages/dashboard/HomeDashboard/HomeDashboard";
export interface BoxHomeDashboardProps {
  data: HomeDashboardData;
}

const BoxHomeDashboard = ({ data }: BoxHomeDashboardProps) => {
  return (
    <div className="px-[32px] py-[16px] border border-[#D6DDEB] min-h-[164px] relative">
      <h2 className="text-[18px] font-medium text-[#202430]">{data.title}</h2>
      <p className="text-[64px] font-bold text-[#202430]">
        {data.price ? "$ " + data.price : data.count}
      </p>

      <img
        src={data.image}
        alt={data.title}
        className="absolute bottom-0 right-6"
      />
    </div>
  );
};

export default BoxHomeDashboard;
