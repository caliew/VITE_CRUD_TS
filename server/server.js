import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const app = express();
dotenv.config();

import dataLoader from  './dataLoader.js';
import authRouter from './authRouter.js';
import workersRouter from './workerRouter.js';
import restaurantRouter from './restaurantRouter.js';
import ragRouter from './ragRouter.js';

dataLoader.loadDataFromFile().then((data) => {
  // Use the loaded data to set up the server
  app.use(cors({
    origin: '*', // allow requests from this origin
    credentials: true, // allow credentials (e.g. cookies, authorization headers)
  }));  
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
  app.use('/api/auth', authRouter);
  app.use('/api/workers', workersRouter);
  app.use('/api/restaurants', restaurantRouter);
  app.use('/api/rag', ragRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });

})