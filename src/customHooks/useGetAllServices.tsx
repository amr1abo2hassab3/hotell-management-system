import { useQuery } from "@tanstack/react-query";
import { handleGetAllSevices } from "../Utils/utils";
import { ServiceType } from "../interfaces/srvicesTypes";

const useGetAllServices = () => {
  const query = useQuery<ServiceType[]>({
    queryKey: ["getAllServices"],
    queryFn: handleGetAllSevices,
  });
  return query;
};

export default useGetAllServices;
