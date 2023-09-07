import { axiosClient } from '@/configs/axios.config';
import { generateObjectId } from '../utils/generateObjectId';
import { StudentDto } from './dtos/student.dto';
import { ResponseStudent, Student } from './entities/student.entity';

const endpoint = `/api/student`;

export const createStudent = async (student: StudentDto) => {
  student.courses = generateObjectId(student.courses);
  student.degrees = generateObjectId(student.degrees);
  student.shifts = generateObjectId(student.shifts);

  const { data } = await axiosClient.post<ResponseStudent>(`${endpoint}`, student);
  return data;
};

export const updateStudent = async (id: string, student: StudentDto) => {
  const { data } = await axiosClient.put<ResponseStudent>(`${endpoint}/${id}`, student);
  return data;
};

export const getAllStudent = async () => {
  const { data } = await axiosClient.get<ResponseStudent>(`${endpoint}`);
  return data;
};

export const getStudent = async (id: string) => {
  const { data } = await axiosClient.get<Student>(`${endpoint}/${id}`);
  return data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await axiosClient.delete(`${endpoint}/${id}`);
  return data;
};
