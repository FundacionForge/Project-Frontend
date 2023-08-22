import { axiosClient } from "@/configs/axios.config";
import { Degree } from "./entities/degree.entity";

export const getAllDegree = async () => {
  const { data } = await axiosClient.get<Degree>(`/api/degree`)
  return data;
}
