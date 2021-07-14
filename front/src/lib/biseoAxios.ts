import axios, { AxiosInstance } from 'axios';
import cookies from 'js-cookie';

export const biseoAxios: AxiosInstance = axios.create({
  headers: {
    withCredentials: true,
    credential: "include",
  },
});

