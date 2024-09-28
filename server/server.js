const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');

// Set the path to the data file
const dataFile = 'data.json';

// Load the data from the file
let data = {};
fs.readFile(dataFile, (err, fileData) => {
  if (err) {
    console.error(err);
  } else {
    data = JSON.parse(fileData);
  }
});

// Middleware to parse request body
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API endpoints for restaurants
app.get('/api/restaurants', (req, res) => {
  res.json(data.restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = data.restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    res.json(restaurant);
  }
});

app.post('/api/restaurants', (req, res) => {
  const { name, address } = req.body;
  const newRestaurant = { id: data.restaurants.length + 1, name, address };
  data.restaurants.push(newRestaurant);
  saveDataToFile();
  res.json(newRestaurant);
});

app.put('/api/restaurants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = data.restaurants.find((restaurant) => restaurant.id === id);
  if (!restaurant) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    const { name, address } = req.body;
    restaurant.name = name;
    restaurant.address = address;
    saveDataToFile();
    res.json(restaurant);
  }
});

app.delete('/api/restaurants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.restaurants.findIndex((restaurant) => restaurant.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Restaurant not found' });
  } else {
    data.restaurants.splice(index, 1);
    saveDataToFile();
    res.json({ message: 'Restaurant deleted' });
  }
});

// API endpoints for workers
app.get('/api/workers', (req, res) => {
  res.json(data.workers);
});

app.get('/api/workers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const worker = data.workers.find((worker) => worker.id === id);
  if (!worker) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    res.json(worker);
  }
});

app.post('/api/workers', (req, res) => {
  const { name, restaurantId } = req.body;
  const newWorker = { id: data.workers.length + 1, name, restaurantId };
  data.workers.push(newWorker);
  saveDataToFile();
  res.json(newWorker);
});

app.put('/api/workers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const worker = data.workers.find((worker) => worker.id === id);
  if (!worker) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    const { name, restaurantId } = req.body;
    worker.name = name;
    worker.restaurantId = restaurantId;
    saveDataToFile();
    res.json(worker);
  }
});

app.delete('/api/workers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.workers.findIndex((worker) => worker.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    data.workers.splice(index, 1);
    saveDataToFile();
    res.json({ message: 'Worker deleted' });
  }
});

// Function to save data to file
function saveDataToFile() {
  const jsonData = JSON.stringify(data);
  fs.writeFile(dataFile, jsonData, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});