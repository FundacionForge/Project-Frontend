import { axiosClient } from '@/configs/axios.config';
import { QualificationDto } from './dtos/qualification.dto';
import { ResponseQualification } from './entities/qualification.entity';

const endpoint = `/api/qualification`;

export const createQualification = async (qualification: QualificationDto) => {
  const { data } = await axiosClient.post<ResponseQualification>(`${endpoint}`, qualification);
  return data;
};

export const getAllQualification = async () => {
  const { data } = await axiosClient.get<ResponseQualification>(`${endpoint}`);
  return data;
};

export const getQualification = async (id: string) => {
  const { data } = await axiosClient.get<ResponseQualification>(`${endpoint}/${id}`);
  return data;
};

export const deleteQualification = async (id: string) => {
  const { data } = await axiosClient.delete(`${endpoint}/${id}`);
  return data;
};
