import { axiosClient } from "@/configs/axios.config";
import { AuthResponse } from "./entities/auth.response";
import { ILogin } from "./types";

export const loginUser = async ({ username, password }: ILogin) => {
  const { data } = await axiosClient.post<AuthResponse>(`/login`, { username, password })
  return data;
}
