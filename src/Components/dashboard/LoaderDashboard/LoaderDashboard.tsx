import ClipLoader from "react-spinners/ClipLoader";

const LoaderDashboard = () => {
  return (
    <div className="flex justify-center items-center h-full w-full z-50">
      <ClipLoader size={50} color="#4A90E2" />
    </div>
  );
};

export default LoaderDashboard;
