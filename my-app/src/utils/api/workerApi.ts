// workers.ts
import axios from 'axios';
import { GetJWTToken } from '../../utils';

const api = axios.create({
    baseURL: 'http://202.59.9.164:3002', 
    headers: {
        Authorization: `${GetJWTToken()}`,
    },
    validateStatus: (status) => status >= 200 && status < 600, // Don't throw an error for status codes 200-599
});

api.interceptors.request.use(async (config) => {
  const token = await GetJWTToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

const getWorkers = async () => {
  const response = await api.get('/api/workers');
  if (response.status !== 200) return null;
  return response.data
};

const getWorker = async (id: number) => {
  const response = await api.get(`/api/workers/${id}`);
  return response.data;
};

const createWorker = async (worker: any) => {
  const response = await api.post('/api/workers', worker);
  return response.data;
};

const updateWorker = async (id: number, worker: any) => {
  const response = await api.put(`/api/workers/${id}`, { ...worker, restaurantId: Number(worker.restaurantId) });
  return response.data;
};

const deleteWorker = async (id: number) => {
  const response = await api.delete(`/api/workers/${id}`);
  return response.data;
};

const getWorkersByRestaurantId = async (restaurantId: number) => {
  const response = await api.get(`/api/restaurants/workers/${restaurantId}`);
  return response.data;
};

export { getWorkers, getWorker, createWorker, updateWorker, deleteWorker, getWorkersByRestaurantId };