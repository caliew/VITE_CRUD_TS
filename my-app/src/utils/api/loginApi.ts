// my-app/src/utils/api/loginApi.ts
import axios from 'axios';
import { setToken, getToken, removeToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' }
});

const login = async (values: any) => {
    try {
      const response = await api.post('/auth/login', values);
      if (response.status === 200) {
        setToken(response.data.token);
        return response;
      } else {
        return Promise.reject(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
};

export { login };