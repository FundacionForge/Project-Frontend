import { ObjectId } from "@/services/types";

export const generateObjectId = (ids: number[] | number): ObjectId[] | ObjectId => {
  if (typeof ids === "number") return { id: ids }
  if (typeof ids === "string") return { id: parseInt(ids) }
  return ids.map(numero => ({ id: numero }));
}
