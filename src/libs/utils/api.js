import axios from 'axios';
import { Cookies } from 'react-cookie';
import config from '../../config';

const instance = axios.create({
  baseURL: config.API_HOST,
  timeout: 40000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

const cookies = new Cookies();

instance.interceptors.request.use(
  async (config) => {
    const token = cookies.get('access_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url) => {
  return instance.get(url).then((res) => {
    if (!res.data.success) {
      throw Error(res.data.message);
    }

    return res.data;
  });
};

export default instance;
