import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
dotenv.config();

// import dataLoader from  './utils/dataLoader.js';
import utils from './utils/utils.js';
import authRouter from './routers/authRouter.js';
import workersRouter from './routers/workerRouter.js';
import restaurantRouter from './routers/restaurantRouter.js';
import ragRouter from './routers/ragRouter.js';

utils.loadDataFromFile().then((data) => {
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