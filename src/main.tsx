import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./Context/AuthContext/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoriteListContextProvider from "./Context/FavoriteListContext.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoriteListContextProvider>
          <ToastContainer />
          <App />
        </FavoriteListContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
