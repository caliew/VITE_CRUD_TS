// server/restaurantRouter.js
import express from 'express';
import { verifyToken } from './auth.js';
import { saveDataToFile } from '../utils/utils.js';

const restaurantRouter = express.Router();

restaurantRouter.use(verifyToken);

// API endpoints for ./api/restaurants
restaurantRouter.get('/', (req, res) => {
  res.json(req.data.restaurants);
});

restaurantRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = req.data.restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    res.json(restaurant);
  }
});

restaurantRouter.post('/', (req, res) => {
  const newRestaurant = { id: (req.data.restaurants.slice(-1)[0]?.id ?? 0) + 1, ...req.body };
  req.data.restaurants.push(newRestaurant);
  saveDataToFile(req.data);
  res.json(newRestaurant);
});

restaurantRouter.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = req.data.restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    Object.assign(restaurant,req.body);
    saveDataToFile(req.data);
    res.json(restaurant);
  }
});

restaurantRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = req.data.restaurants.findIndex((restaurant) => restaurant.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    // REMOVE THE RESTAURANT
    req.data.restaurants.splice(index, 1);
    // REMOVE ALL WORKERS WITH RESTAURANT ID MATCHED
    req.data.workers = req.data.workers.filter((worker) => worker.restaurantId !== id);
    saveDataToFile(req.data);
    res.json({ message: 'Restaurant deleted' });
  }
});

restaurantRouter.get('/workers/:restaurantId', (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId);
  const workers = req.data.workers.filter((worker) => worker.restaurantId === restaurantId);
  res.json(workers);
});

export default restaurantRouter;