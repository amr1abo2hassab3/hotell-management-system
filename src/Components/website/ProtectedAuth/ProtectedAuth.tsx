import { Navigate } from "react-router-dom";

interface ProtectedAuthProps {
  children: React.ReactNode;
}

const ProtectedAuth = ({ children }: ProtectedAuthProps) => {
  const isAuthenticated =
    localStorage.getItem("userData") || sessionStorage.getItem("userData");
  if (isAuthenticated) return <Navigate to={"/"} />;

  return children;
};

export default ProtectedAuth;
