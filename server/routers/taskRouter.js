import express from 'express';
import { saveDataToFile } from '../utils/utils.js';

const taskRouter = express.Router();

// API endpoints for ./api/tasks
taskRouter.get('/', (req, res) => {
    res.json(req.data.tasks);
});

taskRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = req.data.tasks.find((task) => task.id === id);
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    res.json(task);
  }
});

taskRouter.post('/', (req, res) => {
  console.log(req.data.tasks);
  const newTask = { id: (req.data.tasks.slice(-1)[0]?.id ?? 0 ) + 1, ...req.body };
  req.data.tasks.push(newTask);
  saveDataToFile(req.data);
  res.json(newTask);
});

taskRouter.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const task = req.data.tasks.find((task) => task.id === id);
  console.log(task);
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    Object.assign(task, req.body);
    saveDataToFile(req.data);
    res.json(task);
  }
});

taskRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = req.data.tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    // REMOVE THE TASK
    req.data.tasks.splice(index, 1);
    saveDataToFile(req.data);
    res.json({ message: 'Task deleted' });
  }
});

export default taskRouter;