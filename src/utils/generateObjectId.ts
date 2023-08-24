import { ObjectId } from "@/services/types";

export const generateObjectId = (data: number[] | number): ObjectId[] | ObjectId => {
  if (typeof data === "number") return { id: data }
  if (typeof data === "string") return { id: parseInt(data) }
  return data.map(numero => ({ id: numero }));
}
