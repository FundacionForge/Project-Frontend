import { axiosClient } from "@/configs/axios.config";
import { ResponseDegree } from "./entities/degree.entity";

export const getAllDegree = async () => {
  const { data } = await axiosClient.get<ResponseDegree>(`/api/degree`)
  return data;
}
