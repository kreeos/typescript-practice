import axios, { AxiosInstance } from 'axios';
import cookies from 'js-cookie';

export const biseoAxios: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    accses_token: cookies.get('access_token'),
    withCredentials: true,
    credential: "same-origin",
  },
});