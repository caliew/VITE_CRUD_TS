// facilities.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5120',
});

const getFacilities = async () => {
  const response = await api.get('/api/Facilities');
  return response.data;
};
const getFacility = async (id: number) => {
  const response = await api.get(`/api/Facilities/${id}`);
  return response.data;
};

const createFacility = async (worker: any) => {
  const response = await api.post('/api/Facilities', worker);
  return response.data;
};

const updateFacility = async (id: number, worker: any) => {
  const response = await api.put(`/api/Facilities/${id}`, worker);
  return response.data;
};

const deleteFacility = async (id: number) => {
  const response = await api.delete(`/api/Facilities/${id}`);
  return response.data;
};

export { getFacilities, getFacility, createFacility, updateFacility, deleteFacility };