import prisma from '../database/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import {
  UserRegistration,
  UserLogin,
} from '../config/interfaces/authInterface';

export class AuthService {
  async registerUser({ name, email, password }: UserRegistration) {
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist) {
      throw new BadRequestError('User already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      status: StatusCodes.CREATED,
      message: 'User registered successfully',
    };
  }

  async loginUser({ email, password }: UserLogin) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError('User not registered');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError('Authentication Failed');
    }

    const payload = { id: user.id, email: user.email };
    const expiration = { expiresIn: '1h' };

    const token = jwt.sign(payload, String(process.env.JWT_SECRET), expiration);

    return {
      status: StatusCodes.OK,
      message: 'Authentication Successful',
      token,
    };
  }
}
