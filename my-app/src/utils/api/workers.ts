// workers.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const getWorkers = async () => {
  const response = await api.get('/api/workers');
  return response.data;
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
  const response = await api.put(`/api/workers/${id}`, worker);
  return response.data;
};

const deleteWorker = async (id: number) => {
  const response = await api.delete(`/api/workers/${id}`);
  return response.data;
};

export { getWorkers, getWorker, createWorker, updateWorker, deleteWorker };