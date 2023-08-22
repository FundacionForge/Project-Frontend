import { axiosClient } from "@/configs/axios.config";
import { Shift } from "./entities/shift.entity";

export const getAllShift = async () => {
  const { data } = await axiosClient.get<Shift>(`/api/shift`)
  return data;
}
