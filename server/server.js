const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const dataLoader = require('./dataLoader');
const workersRouter = require('./workerRouter');
const restaurantRouter = require('./restaurantRouter');

dataLoader.loadDataFromFile().then((data) => {
  // Use the loaded data to set up the server
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    req.data = data
    next();
  });
  // Set up routes
  // app.use('/api', require('./routes'));
  app.use('/api/workers', workersRouter);
  app.use('/api/restaurants', restaurantRouter);
  // -----------------------------
  // API endpoints for restaurants
  // -----------------------------

  // -------------------------
  // API endpoints for workers
  // -------------------------

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

})