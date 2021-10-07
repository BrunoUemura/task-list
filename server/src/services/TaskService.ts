import prisma from '../database/client';
import { StatusCodes } from 'http-status-codes';
import { ITaskCreate, ITaskUpdate } from '../config/interfaces';

export class TaskService {
  async findAllTasks() {
    try {
      return await prisma.list.findMany();
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findTask(id: string) {
    try {
      return await prisma.list.findFirst({
        where: {
          id: id,
        },
      });
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createTask({ title, userId }: ITaskCreate) {
    try {
      await prisma.list.create({
        data: {
          title,
          userId,
        },
      });

      return {
        status: StatusCodes.CREATED,
        message: 'Task created successfully',
      };
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async updateTask(id: string, { title, done }: ITaskUpdate) {
    try {
      await prisma.list.update({
        where: { id: id },
        data: {
          title,
          done,
        },
      });

      return {
        status: StatusCodes.OK,
        message: 'Task updated successfully',
      };
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async deleteTask(id: string) {
    try {
      await prisma.list.delete({
        where: {
          id,
        },
      });

      return {
        status: StatusCodes.OK,
        message: 'Task deleted successfully',
      };
    } catch (error: any) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
