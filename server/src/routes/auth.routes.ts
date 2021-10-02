import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';

export const auth = Router();

const registrationValidation = [
  body('name').notEmpty(),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().isLength({ min: 4, max: 20 }),
];

const loginValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
];

const logoutValidation = [body('token').isString()];

auth
  .post('/auth/register', registrationValidation, AuthController.registerUser)
  .post('/auth/login', loginValidation, AuthController.loginUser);
