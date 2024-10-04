// my-app/src/utils/api/loginApi.ts
import axios from 'axios';
import { setToken, getToken, removeToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status >= 200 && status < 600, // Don't throw an error for status codes 200-599
});

const loginApi = async (values: any) => {
    try {
      const response = await api.post('/auth/login', values);
      if (response.status === 200) setToken(response.data.token);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
};

export { loginApi };