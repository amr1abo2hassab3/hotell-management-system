import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./Pages/website/Home/Home";
import Room from "./Pages/website/Room/Room";
import Services from "./Pages/website/Services/Services";
import ContactUs from "./Pages/website/ContactUs/ContactUs";
import Login from "./Pages/website/Login/Login";
import Register from "./Pages/website/Register/Register";
import ForgotPassword from "./Pages/website/ForgotPassword/ForgotPassword";
import VerifyCode from "./Pages/website/VerifyCode/VerifyCode";
import NewPassword from "./Pages/website/NewPassword/NewPassword";
import ProtectedRoute from "./Components/website/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./Components/website/ProtectedAuth/ProtectedAuth";
import RoomDetails from "./Pages/website/RoomDetails/RoomDetails";
import DashboardLayout from "./layout/DashboardLayout";
import HomeDashboard from "./Pages/dashboard/HomeDashboard/HomeDashboard";
import Reservations from "./Pages/dashboard/Reservations/Reservations";
import AdminRoute from "./Components/dashboard/AdminRoute/AdminRoute";
import UserDashboard from "./Pages/dashboard/UsersDashboard/UsersDashboard";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/room",
        element: (
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        ),
      },
      {
        path: "/room/roomDetails/:idRoom",
        element: (
          <ProtectedRoute>
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/services",
        element: (
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contactus",
        element: (
          <ProtectedRoute>
            <ContactUs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <ProtectedAuth>
            <ForgotPassword />
          </ProtectedAuth>
        ),
      },
      {
        path: "/verify",
        element: (
          <ProtectedAuth>
            <VerifyCode />
          </ProtectedAuth>
        ),
      },
      {
        path: "/new-password",
        element: (
          <ProtectedAuth>
            <NewPassword />
          </ProtectedAuth>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeDashboard />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "users",
        element: <UserDashboard />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
