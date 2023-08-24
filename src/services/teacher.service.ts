import { axiosClient } from '@/configs/axios.config';
import { TeacherDto } from './dtos/teacher.dto';
import { ResponseTeacher } from './entities/teacher.entity';


const endpoint = `/api/teacher`;

export const createTeacher = async (teacher: TeacherDto) => {
  const { data } = await axiosClient.post<ResponseTeacher>(`${endpoint}`, teacher);
  return data;
};

export const getAllTeacher = async () => {
  const { data } = await axiosClient.get<ResponseTeacher>(`${endpoint}`);
  return data;
};

export const getTeacher = async (id: string) => {
  const { data } = await axiosClient.get<ResponseTeacher>(`${endpoint}/${id}`);
  return data;
};

export const deleteTeacher = async (id: string) => {
  const { data } = await axiosClient.delete(`${endpoint}/${id}`);
  return data;
};
