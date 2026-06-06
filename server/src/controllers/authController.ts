import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      
      res.cookie('auth-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict',
      });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);

      res.cookie('auth-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict',
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('auth-token');
      return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }
}
