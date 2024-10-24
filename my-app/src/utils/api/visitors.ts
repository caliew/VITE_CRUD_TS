// visitors.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5120',
});

const getVisitors = async () => {
  const response = await api.get('/api/Visitor');
  return response.data;
};
const getVisitor = async (id: number) => {
  const response = await api.get(`/api/Visitor/${id}`);
  return response.data;
};

const createVisitor = async (worker: any) => {
  const response = await api.post('/api/Visitor', worker);
  return response.data;
};

const updateVisitor = async (id: number, worker: any) => {
  const response = await api.put(`/api/Visitor/${id}`, worker);
  return response.data;
};

const deleteVisitor = async (id: number) => {
  const response = await api.delete(`/api/Visitor/${id}`);
  return response.data;
};

export { getVisitors, getVisitor, createVisitor, updateVisitor, deleteVisitor };