import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const tasks = Router();

tasks.get('/tasks', TaskController.findAllTasks);
tasks.get('/tasks/:id', TaskController.findTask);
tasks.post('/tasks', authMiddleware, TaskController.createTask);
tasks.put('/tasks/:id', authMiddleware, TaskController.updateTask);
tasks.delete('/tasks/:id', authMiddleware, TaskController.deleteTask);

export { tasks };
