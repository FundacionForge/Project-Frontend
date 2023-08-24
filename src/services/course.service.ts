import { axiosClient } from "@/configs/axios.config";
import { ResponseCourse } from "./entities/courses.entity";

export const getAllCourse = async () => {
  const { data } = await axiosClient.get<ResponseCourse>(`/api/course`)
  return data;
}
