import axios, { AxiosInstance } from 'axios';
import cookies from 'js-cookie';

export const biseoAxios: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    withCredentials: true,
    credential: "include",
  },
});