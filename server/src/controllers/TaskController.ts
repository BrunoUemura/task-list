import { NextFunction, Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  static async findAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const taskService = new TaskService();
      const tasks = await taskService.findAllTasks();
      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  static async findTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const taskService = new TaskService();
      const task = await taskService.findTask(id);
      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const taskService = new TaskService();
      const task = await taskService.createTask(title);
      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, done } = req.body;
      const taskService = new TaskService();
      const task = await taskService.updateTask(id, { title, done });
      return res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const taskService = new TaskService();
      const task = await taskService.deleteTask(id);
      return res.json(task);
    } catch (error) {
      next(error);
    }
  }
}
