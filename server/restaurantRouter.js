// server/restaurantRouter.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('./auth');

router.use(verifyToken);
// API endpoints for ./api/restaurants
router.get('/', (req, res) => {
  console.log('GET /api/restaurants')
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
  const { saveDataToFile } = require('./utils');
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
    const { saveDataToFile } = require('./utils');
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
    req.data.restaurants.splice(index, 1);
    const { saveDataToFile } = require('./utils');
    saveDataToFile(req.data);
    res.json({ message: 'Restaurant deleted' });
  }
});

router.get('/workers/:restaurantId', (req, res) => {
    const restaurantId = parseInt(req.params.restaurantId);
    const workers = req.data.workers.filter((worker) => worker.restaurantId === restaurantId);
    res.json(workers);
  });

module.exports = router;