import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';
import { AuthService } from '../services/AuthService';

export class AuthController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { name, email, password } = req.body;
      const authService = new AuthService();
      const user = await authService.registerUser({ name, email, password });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { email, password } = req.body;
      const authService = new AuthService();
      const user = await authService.loginUser({ email, password });

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
