import axios from "axios";
import { baseUrl, featured, services } from "../Api/Api";
import { ServiceType } from "./../interfaces/srvicesTypes";
import { RoomsResponse } from "../interfaces/roomTypes";
export const handleGetAllFeatured = (token: string): Promise<RoomsResponse> => {
  return axios
    .get(`${baseUrl}${featured}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const handleGetAllSevices = (): Promise<ServiceType[]> => {
  return axios.get(`${baseUrl}${services}`).then((res) => res.data);
};
