import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001',
});

const getRestaurants = async () => {
  const response = await api.get('/api/restaurants');
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
  console.log('API DELETE.../api/restaurants/:id', id);
  try {
    const response = await api.delete(`/api/restaurants/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};

export { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant };