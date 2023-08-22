import { axiosClient } from "@/configs/axios.config";
import { StudentDto } from "./dtos/student.dto";
import { Student } from "./entities/student.entity";

export const createStudent = async (student: StudentDto) => {
  const { data } = await axiosClient.post<Student>(`/api/student`, student)
  return data;
}

export const getAllStudent = async () => {
  const { data } = await axiosClient.get<Student>(`/api/student`)
  return data;
}

export const getStudent = async (id: string) => {
  const { data } = await axiosClient.get<Student>(`/api/student/${id}`)
  return data;
}

export const deleteStudent = async (id: string) => {
  const { data } = await axiosClient.delete(`/api/student/${id}`)
  return data;
}
