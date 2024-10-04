// server/workerRouter.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('./auth');

router.use(verifyToken);
// API endpoints for ./api/workers
router.get('/', (req, res) => {
  res.json(req.data.workers);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const worker = req.data.workers.find((worker) => worker.id === id);
  if (!worker) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    res.json(worker);
  }
});

router.post('/', (req, res) => {
  const { name, restaurantId } = req.body;
  const newWorker = { id: req.data.workers.slice(-1)[0].id + 1, name, restaurantId };
  req.data.workers.push(newWorker);
  const { saveDataToFile } = require('./utils');
  saveDataToFile(req.data);
  res.json(newWorker);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const worker = req.data.workers.find((worker) => worker.id === id);
  if (!worker) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    const { name, restaurantId } = req.body;
    worker.name = name;
    worker.restaurantId = restaurantId;
    const { saveDataToFile } = require('./utils');
    saveDataToFile(req.data);
    res.json(worker);
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = req.data.workers.findIndex((worker) => worker.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Worker not found' });
  } else {
    req.data.workers.splice(index, 1);
    const { saveDataToFile } = require('./utils');
    saveDataToFile(req.data);
    res.json({ message: 'Worker deleted' });
  }
});

module.exports = router;