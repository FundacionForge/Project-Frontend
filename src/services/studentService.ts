import { axiosClient } from "@/configs/axios.config";
import { IStudent, IStudentDto } from "./dto/studentDto";

export const createStudent = async (student: IStudentDto) => {
  const { data } = await axiosClient.post<IStudent>(`/api/student`, student)
  return data;
}

export const getAllStudent = async () => {
  const { data } = await axiosClient.get<IStudent[]>(`/api/student`)
  return data;
}

export const getStudent = async (id: string) => {
  const { data } = await axiosClient.get<IStudent>(`/api/student/${id}`)
  return data;
}

export const deleteStudent = async (id: string) => {
  const { data } = await axiosClient.delete(`/api/student/${id}`)
  return data;
}
