import axios from "axios";
import { createContext, useContext, useState } from "react";
import { baseUrl, favorite } from "../Api/Api";
import { AuthContext } from "./AuthContext/AuthContext";
import { toast } from "react-toastify";
import {
  FavoriteContextProps,
  FavoriteListContextProviderProps,
} from "../interfaces/favoriteTypes";
import { useQueryClient } from "@tanstack/react-query";

export const FavoriteContext = createContext<FavoriteContextProps>(
  {} as FavoriteContextProps
);

const FavoriteListContextProvider = ({
  children,
}: FavoriteListContextProviderProps) => {
  const { userData } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleAddToUserFavorite = async (roomId: number): Promise<void> => {
    if (userData?.id) {
      const bodyData = {
        userId: userData?.id,
        roomId: roomId,
      };
      try {
        await toast.promise(
          axios.post(`${baseUrl}${favorite}`, bodyData),
          {
            pending: "Adding To Favorite 💖...",
            success: "Room has been Added to Favorite 💖 successfully",
            error: "Failed to Adding Room",
          },
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          }
        );
        await queryClient.invalidateQueries({ queryKey: ["getAllFeatuerd"] });
        await queryClient.invalidateQueries({ queryKey: ["getAllRooms"] });
        await queryClient.invalidateQueries({
          queryKey: ["getAllFavoriteRooms"],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDeleteFromUserFavorite = async (
    roomId: number
  ): Promise<void> => {
    if (userData?.id) {
      const bodyData = {
        userId: userData?.id,
        roomId: roomId,
      };
      try {
        await toast.promise(
          axios.delete(`${baseUrl}${favorite}`, {
            data: bodyData,
          }),
          {
            pending: "Removing from Favorite 💔...",
            success: "Room has been removed from Favorite 💔 successfully",
            error: "Failed to remove Room",
          },
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          }
        );
        await queryClient.invalidateQueries({ queryKey: ["getAllFeatuerd"] });
        await queryClient.invalidateQueries({ queryKey: ["getAllRooms"] });
        await queryClient.invalidateQueries({
          queryKey: ["getAllFavoriteRooms"],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <FavoriteContext.Provider
      value={{
        handleAddToUserFavorite,
        handleDeleteFromUserFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteListContextProvider;
