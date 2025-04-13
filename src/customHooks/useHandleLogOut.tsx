import { useContext } from "react";
import { AuthContextProps } from "../interfaces/authTypes";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const useHandleLogOut = (): (() => void) => {
  const { setUserData } = useContext<AuthContextProps>(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    setUserData(null);
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
  };
  return handleLogOut;
};

export default useHandleLogOut;
