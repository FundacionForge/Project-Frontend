import { axiosClient } from "@/configs/axios.config";
import { ResponseShift } from "./entities/shift.entity";

export const getAllShift = async () => {
  const { data } = await axiosClient.get<ResponseShift>(`/api/shift`)
  return data;
}
