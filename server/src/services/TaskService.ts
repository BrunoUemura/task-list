import prisma from '../database/client';
import { StatusCodes } from 'http-status-codes';
import { TitleUpdate } from '../config/interfaces/taskInterface';

export class TaskService {
  async findAllTasks() {
    return await prisma.list.findMany();
  }

  async findTask(id: string) {
    return await prisma.list.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createTask(title: string) {
    await prisma.list.create({
      data: {
        title,
      },
    });

    return {
      status: StatusCodes.CREATED,
      message: 'Task created successfully',
    };
  }

  async updateTask(id: string, { title, done }: TitleUpdate) {
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
  }

  async deleteTask(id: string) {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return {
      status: StatusCodes.OK,
      message: 'Task deleted successfully',
    };
  }
}
