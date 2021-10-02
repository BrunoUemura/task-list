import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { app } from '../src/app';
import prisma from '../src/database/client';

const request = supertest(app);

interface UserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

afterAll(async () => {
  await prisma.user.delete({
    where: {
      email: 'test.test@gmail.com',
    },
  });

  await prisma.$disconnect();
});

describe('Auth Routes Test', () => {
  it('should return registration success', async () => {
    const user = {
      name: 'test',
      email: 'test.test@gmail.com',
      password: 'test',
    };

    const response = await request.post('/api/v1/auth/register').send(user);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should return registration failed, user already registered', async () => {
    const user = {
      name: 'test',
      email: 'test.test@gmail.com',
      password: 'test',
    };

    const response = await request.post('/api/v1/auth/register').send(user);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.errors[0].message).toBe('User already registered');
  });

  it('should return login success', async () => {
    const user = {
      email: 'test.test@gmail.com',
      password: 'test',
    };

    const response = await request.post('/api/v1/auth/login').send(user);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Authentication Successful');
    expect(response.body).toHaveProperty('token');
  });
});

describe('User Routes Test', () => {
  it('should return find all users successfully', async () => {
    const response = await request.get('/api/v1/users');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should return find one user successfully', async () => {
    const user: UserResponse | null = await prisma.user.findFirst({
      where: { email: 'test.test@gmail.com' },
    });
    const id = user?.id;

    const response = await request.get(`/api/v1/users/${id}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.id).toBe(id);
    expect(response.body.name).toBe('test');
    expect(response.body.email).toBe('test.test@gmail.com');
  });
});
