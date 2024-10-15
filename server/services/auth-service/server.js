import express from 'express';
import authRouter from './authRouter.js';

const app = express();

app.use(express.json());

app.use('/', authRouter);

app.listen(3001, () => {
  console.log('Auth service listening on port 3001');
});