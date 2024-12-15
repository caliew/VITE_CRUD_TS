// server/restaurantRouter.js
import express from 'express';
import cors from 'cors';

import { verifyToken } from './auth.js';
import { saveDataToFile } from '../utils/utils.js';

const router = express.Router();

router.use(cors({origin: '*'}));
router.use(verifyToken);

// API endpoints for ./api/restaurants
router.get('/', (req, res) => {
  res.json(req.data.restaurants);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = req.data.restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    res.json(restaurant);
  }
});

router.post('/', (req, res) => {
  const { name, address } = req.body;
  const newRestaurant = { id: req.data.restaurants.slice(-1)[0].id + 1, name, address };
  req.data.restaurants.push(newRestaurant);
  saveDataToFile(req.data);
  res.json(newRestaurant);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = req.data.restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    const { name, address } = req.body;
    restaurant.name = name;
    restaurant.address = address;
    saveDataToFile(req.data);
    res.json(restaurant);
  }
});

router.delete('/:id', (req, res) => {
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

router.get('/workers/:restaurantId', (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId);
  const workers = req.data.workers.filter((worker) => worker.restaurantId === restaurantId);
  res.json(workers);
});

export default router;