// server/workerRouter.js
import express from 'express';
import { verifyToken } from './auth.js';
import { saveDataToFile } from '../utils/utils.js';

const workerRouter = express.Router();

workerRouter.use(verifyToken);

// API endpoints for ./api/workers
workerRouter.get('/', (req, res) => {
  res.json(req.data.workers);
});

workerRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const worker = req.data.workers.find((worker) => worker.id === id);
  if (!worker) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    res.json(worker);
  }
});

workerRouter.post('/', (req, res) => {
  const newWorker = { id: (req.data.workers.slice(-1)[0]?.id ?? 0)+ 1, ...req.body };
  req.data.workers.push(newWorker);
  saveDataToFile(req.data);
  res.json(newWorker);
});

workerRouter.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const worker = req.data.workers.find((worker) => worker.id === id);
  if (!worker) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    Object.assign(worker, req.body);
    saveDataToFile(req.data);
    res.json(worker);
  }
});

workerRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = req.data.workers.findIndex((worker) => worker.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    req.data.workers.splice(index, 1);
    saveDataToFile(req.data);
    res.json({ message: 'Worker deleted' });
  }
});

export default workerRouter;