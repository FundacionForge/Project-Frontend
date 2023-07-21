import { axiosClient } from "@/configs/axios.config";
import { useMutation } from "@tanstack/react-query";

interface ILogin {
  username:   string
  password:   string
}

export const loginUser = async ({username, password}: ILogin) => {
  try {
    const { data } = await axiosClient.post(`/login`, {username, password})
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const useLoginMutation = () => useMutation(loginUser);
