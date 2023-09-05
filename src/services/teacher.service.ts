import { axiosClient } from '@/configs/axios.config';
import { generateObjectId } from '@/utils/generateObjectId';
import { TeacherDto } from './dtos/teacher.dto';
import { ResponseTeacher, Teacher } from './entities/teacher.entity';

const endpoint = `/api/teacher`;

export const createTeacher = async (teacher: TeacherDto) => {
  teacher.degrees = generateObjectId(teacher.degrees);
  teacher.shifts = generateObjectId(teacher.shifts);
  teacher.courses = generateObjectId(teacher.courses);
  teacher.qualification = generateObjectId(teacher.qualification);

  const { data } = await axiosClient.post<ResponseTeacher>(`${endpoint}`, teacher);
  return data;
};

export const getAllTeacher = async () => {
  const { data } = await axiosClient.get<ResponseTeacher>(`${endpoint}`);
  return data;
};

export const getTeacher = async (id: string) => {
  const { data } = await axiosClient.get<Teacher>(`${endpoint}/${id}`);
  return data;
};

export const deleteTeacher = async (id: string) => {
  const { data } = await axiosClient.delete(`${endpoint}/${id}`);
  return data;
};
