import { ObjectId } from '@/services/types';

export const generateObjectId = (data: number[] | number): ObjectId[] | ObjectId => {
  if (typeof data === "number") return { id: data } as ObjectId;
  if (typeof data === "string") return { id: parseInt(data) } as ObjectId;
  return data.map(numero => ({ id: numero })) as ObjectId[];
};
