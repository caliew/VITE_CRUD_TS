import axios from 'axios';
import { GetJWTToken } from '..';

const api = axios.create({
    baseURL: 'http://localhost:3002', 
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

const getRestaurants = async () => {
  const response = await api.get('/api/restaurants');
  if (response.status !== 200) return null;
  return response.data;
};

const getRestaurant = async (id: number) => {
  const response = await api.get(`/api/restaurants/${id}`);
  return response.data;
};

const createRestaurant = async (restaurant: any) => {
  const response = await api.post('/api/restaurants', restaurant);
  return response.data;
};

const updateRestaurant = async (id: number, restaurant: any) => {
  const response = await api.put(`/api/restaurants/${id}`, restaurant);
  return response.data;
};

const deleteRestaurant = async (id: number) => {
  try {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant };