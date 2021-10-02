import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { TitleUpdate } from '../config/interfaces/taskInterface';

export class TaskService {
  private prisma = new PrismaClient();

  async findAllTasks() {
    return await this.prisma.list.findMany();
  }

  async findTask(id: string) {
    return await this.prisma.list.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createTask(title: string) {
    await this.prisma.list.create({
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
    await this.prisma.list.update({
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
    await this.prisma.user.delete({
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
