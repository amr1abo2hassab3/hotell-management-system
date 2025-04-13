import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const isAuthenticated =
    localStorage.getItem("userData") || sessionStorage.getItem("userData");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(isAuthenticated);
  if (parsedUser.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
