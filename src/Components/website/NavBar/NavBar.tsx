import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";
import { AuthContextProps } from "../../../interfaces/authTypes";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { navLinksTypes } from "../../../interfaces/navBarTypes";
import useHandleLogOut from "../../../customHooks/useHandleLogOut";

const navLinks: navLinksTypes[] = [
  { to: "/", name: "home" },
  { to: "/room", name: "room" },
  { to: "/services", name: "services" },
  { to: "/contactus", name: "contact us" },
  { to: "/sittings", name: "Sittings" },
];

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("English");
  const { userData } = useContext<AuthContextProps>(AuthContext);

  const handleLogOut = useHandleLogOut();

  return (
    <nav className="bg-white h-[102px] relative top-0 left-0 right-0 z-40 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="w-[80px] h-[80px] md:w-[102px] md:h-[102px]"
            src={logo}
            alt="logo"
          />
        </div>

        {/* Desktop Menu */}
        {userData && (
          <div className="hidden md:flex items-center space-x-11">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                className="capitalize text-gray-700 font-bold hover:text-mainColor transition"
                to={item.to}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* Language & Auth */}

        <div className="hidden md:flex items-center space-x-8">
          <i className="fa-solid fa-globe text-xl text-gray-800"></i>
          <select
            className="capitalize text-gray-700 !ml-[7px] cursor-pointer bg-white border border-gray-400 rounded-md px-3 py-2 shadow-md transition focus:outline-none focus:ring-2 focus:ring-mainColor focus:shadow-lg"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Arabic">العربية</option>
          </select>

          {!userData ? (
            <>
              {" "}
              <Link
                to="/login"
                className="text-mainColor text-[14px] capitalize"
              >
                log in
              </Link>
              <Link
                to="/register"
                className="bg-mainColor text-white px-4 py-2 rounded text-[14px]"
              >
                sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogOut}
              className="bg-mainColor text-white px-4 py-2 rounded text-[14px]"
            >
              Log out
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="flex capitalize flex-col items-center pt-16 space-y-6">
          {userData && (
            <>
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  className="text-gray-700 font-bold w-full text-center border-b-[1px] border-[#986d3c42]  !m-0 p-[15px_5px]"
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </>
          )}
          <div className="flex items-center space-x-4">
            <i className="fa-solid fa-globe text-xl text-gray-800"></i>
            <select
              className="capitalize text-gray-700 !ml-1 cursor-pointer bg-transparent border-none focus:outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Arabic">العربية</option>
            </select>
          </div>
          <div className="flex flex-col space-y-4">
            {!userData ? (
              <>
                <Link
                  to="/login"
                  className="text-mainColor text-center text-[14px]"
                  onClick={() => setMenuOpen(false)}
                >
                  login
                </Link>
                <Link
                  to="/register"
                  className="bg-mainColor text-white px-4 py-2 rounded text-[14px]"
                  onClick={() => setMenuOpen(false)}
                >
                  sign up
                </Link>
              </>
            ) : (
              <button
                className="bg-mainColor text-white px-4 py-2 rounded text-[14px]"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogOut();
                }}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
