// facilities.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5120',
});

const getBookings = async () => {
  const response = await api.get('/api/Booking');
  return response.data;
};
const getBooking = async (id: number) => {
  const response = await api.get(`/api/Booking/${id}`);
  return response.data;
};

const createBooking = async (worker: any) => {
  const response = await api.post('/api/Booking', worker);
  return response.data;
};

const updateBooking = async (id: number, worker: any) => {
  const response = await api.put(`/api/Booking/${id}`, worker);
  return response.data;
};

const deleteBooking = async (id: number) => {
  const response = await api.delete(`/api/Booking/${id}`);
  return response.data;
};

export { getBookings, getBooking, createBooking, updateBooking, deleteBooking };