import HashLoader from "react-spinners/HashLoader";

const LoaderDashboard = () => {
  return (
    <div className="flex justify-center items-center h-full w-full z-50">
      <HashLoader size={60} color="#4A90E2" />
    </div>
  );
};

export default LoaderDashboard;
