import { Outlet } from "react-router-dom";
import Footer from "../Components/website/Footer/Footer";
import NavBar from "../Components/website/NavBar/NavBar";

const Layout = () => {
  return (
    <div className="w-full overflow-hidden">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
