import { axiosClient } from '@/configs/axios.config';
import { TeacherDto } from './dtos/teacher.dto';
import { Teacher } from './entities/teacher.entity';

export const createTeacher = async (teacher: TeacherDto) => {
  const { data } = await axiosClient.post<Teacher>(`/api/teacher`, teacher);
  return data;
};

export const getAllTeacher = async () => {
  const { data } = await axiosClient.get<Teacher>(`/api/teacher`);
  return data;
};

export const getTeacher = async (id: string) => {
  const { data } = await axiosClient.get<Teacher>(`/api/teacher/${id}`);
  return data;
};

export const deleteTeacher = async (id: string) => {
  const { data } = await axiosClient.delete(`/api/teacher/${id}`);
  return data;
};
