// my-app/src/utils/api/loginApi.ts
import axios from 'axios';
import { setToken, setAccessCode } from './auth';
import { AppConfig } from '../../config';

// console.log(process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: AppConfig.apiBaseUrl + '/api',
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status >= 200 && status < 600, // Don't throw an error for status codes 200-599
});

const loginApi = async (values: any) => {
    try {
      const response = await api.post('/auth/login', values);
      if (response.status === 200) {
        setToken(response.data.token);
        setAccessCode(response.data.accessCode);
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
};

export { loginApi };