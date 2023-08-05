import { axiosClient } from "@/configs/axios.config";
import { Course } from "./entities/courses.entity";

export const getAllCourse = async () => {
  const { data } = await axiosClient.get<Course[]>(`/api/course`)
  return data;
}
