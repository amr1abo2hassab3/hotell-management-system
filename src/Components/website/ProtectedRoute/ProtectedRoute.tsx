import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated =
    localStorage.getItem("userData") || sessionStorage.getItem("userData");

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
