import { axiosClient } from '@/configs/axios.config';
import { QualificationDto } from './dtos/qualification.dto';
import { Qualification } from './entities/qualification.entity';

export const createQualification = async (qualification: QualificationDto) => {
  const { data } = await axiosClient.post<Qualification>(`/api/qualification`, qualification);
  return data;
};

export const getAllQualification = async () => {
  const { data } = await axiosClient.get<Qualification>(`/api/qualification`);
  return data;
};

export const getQualification = async (id: string) => {
  const { data } = await axiosClient.get<Qualification>(`/api/qualification/${id}`);
  return data;
};

export const deleteQualification = async (id: string) => {
  const { data } = await axiosClient.delete(`/api/qualification/${id}`);
  return data;
};
