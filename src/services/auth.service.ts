import { axiosClient } from "@/configs/axios.config";
import { ILogin } from "./types";

export const loginUser = async ({username, password}: ILogin) => {
  const { data } = await axiosClient.post(`/login`, {username, password})
  return data;
}
