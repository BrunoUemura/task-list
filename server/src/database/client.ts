import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch(() => {
    console.log('Unable to connect to database');
  });

export default prisma;
