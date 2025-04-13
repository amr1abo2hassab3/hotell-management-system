import { useQuery } from "@tanstack/react-query";
import { handleGetAllFeatured } from "../Utils/utils";
import { RoomsResponse } from "../interfaces/roomTypes";
import { useContext } from "react";
import { AuthContextProps } from "../interfaces/authTypes";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const useGetAllFeatured = () => {
  const { userData } = useContext<AuthContextProps>(AuthContext);

  const query = useQuery<RoomsResponse>({
    queryKey: ["getAllFeatuerd"],
    queryFn: () => handleGetAllFeatured(userData?.token),
    enabled: !!userData?.token,
  });
  return query;
};

export default useGetAllFeatured;
