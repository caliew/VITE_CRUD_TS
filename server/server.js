import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';	
import { createProxyMiddleware } from 'http-proxy-middleware';

let count = 0;
const app = express();
dotenv.config();

// import dataLoader from  './utils/dataLoader.js';
import utils from './utils/utils.js';
import authRouter from './services/auth-service/authRouter.js';
import workersRouter from './services/worker-service/workerRouter.js';
import restaurantRouter from './services/restaurant-service/restaurantRouter.js';
import ragRouter from './services/rag-service/ragRouter.js';

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
  /*
  app.use('/api/auth', (req, res, next) => {
    console.log('../api/auth..',count);
    count ++;
    next();
  }, createProxyMiddleware({
    target: 'http://localhost:3001/api/auth',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      console.log('onProxyReq callback executed');
      console.log('req object:', req);
      console.log('req.url:', req.url);
      console.log('Proxy request:', proxyReq);
      console.log('Proxy request headers:', proxyReq.headers);
      console.log('Proxy request body:', proxyReq.body);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('Proxy response:', proxyRes);
      console.log('Proxy response headers:', proxyRes.headers);
      console.log('Proxy response body:', proxyRes.body);
    },
    onError: (err, req, res) => {
      console.log('Proxy error:', err);
      console.log('Proxy error stack:', err.stack);
    },
  }));
  */
  
  /*
  const apiProxy = createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: false,
    secure: false,
    logLevel: 'debug',
    logger: console,
    onProxyReq: (proxyReq, req, res) => {
      console.log('onProxyReq callback executed');
      console.log('req object:', req);
      console.log('req.url:', req.url);
      console.log('Proxy request:', proxyReq);
      console.log('Proxy request headers:', proxyReq.headers);
      console.log('Proxy request body:', proxyReq.body);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('Proxy response:', proxyRes);
      console.log('Proxy response headers:', proxyRes.headers);
      console.log('Proxy response body:', proxyRes.body);
    },
    onError: (err, req, res) => {
      console.log('Proxy error:', err);
      console.log('Proxy error stack:', err.stack);
    },
  });
  */

  app.use('/api/auth', proxy('http://localhost:3001/api/auth', {
    onProxyReq: (proxyReq, req, res) => {
      console.log('onProxyReq callback executed');
      console.log('req object:', req);
      console.log('req.url:', req.url);
      console.log('Proxy request:', proxyReq);
      console.log('Proxy request headers:', proxyReq.headers);
      console.log('Proxy request body:', proxyReq.body);
      console.log(res);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('Proxy response:', proxyRes);
      console.log('Proxy response headers:', proxyRes.headers);
      console.log('Proxy response body:', proxyRes.body);
    },
    onError: (err, req, res) => {
      console.log('Proxy error:', err);
      console.log('Proxy error stack:', err.stack);
    },
  }));
  

  /*
  app.use('/api/auth', (req, res, next) => {
    console.log('app.use callback executed');
    next();
  }, apiProxy);
  */

  // app.use('/api/auth', authRouter);
  app.use('/api/workers', workersRouter);
  app.use('/api/restaurants', restaurantRouter);
  app.use('/api/rag', ragRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });

})