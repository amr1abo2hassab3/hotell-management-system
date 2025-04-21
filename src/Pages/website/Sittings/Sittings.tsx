import { Outlet } from "react-router-dom";

const Sittings = () => {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-4 bg-gray-100  ml-0 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Sittings;
