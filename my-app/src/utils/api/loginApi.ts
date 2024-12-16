// my-app/src/utils/api/loginApi.ts
import axios from 'axios';
import { setAccessCode } from './auth';
import { SetJWTToken, RemoveJWTToken } from '../../utils';

const api = axios.create({
  baseURL: 'http://202.59.9.164:3002/api',
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status >= 200 && status < 600, // Don't throw an error for status codes 200-599
});

const loginApi = async (values: any) => {
    try {
      const response = await api.post('/auth/login', values);
      if (response.status === 200) {
        SetJWTToken(response.data.token);
        setAccessCode(response.data.accessCode);
      } else {
        RemoveJWTToken();
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
};

export { loginApi };