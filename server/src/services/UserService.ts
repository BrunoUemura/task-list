import prisma from '../database/client';
import { StatusCodes } from 'http-status-codes';
import { UserUpdate } from '../config/interfaces/userInterface';

export class UserService {
  async findAllUsers() {
    return await prisma.user.findMany();
  }

  async findUser(id: string) {
    return await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async updateUser(id: string, { name, password }: UserUpdate) {
    await prisma.user.update({
      where: { id: id },
      data: {
        name,
      },
    });

    return {
      status: StatusCodes.OK,
      message: 'User updated successfully',
    };
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return {
      status: StatusCodes.OK,
      message: 'User deleted successfully',
    };
  }
}
