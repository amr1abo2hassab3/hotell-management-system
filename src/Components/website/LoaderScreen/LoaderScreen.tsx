import { ClockLoader } from "react-spinners";

const LoaderScreen = () => {
  return (
    <div className="h-screen z-50 fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-white bg-opacity-30 backdrop-blur">
      <ClockLoader size={150} color="#986d3c" />
      <p className="text-white mt-4">جاري تحميل البيانات...</p>
    </div>
  );
};

export default LoaderScreen;
