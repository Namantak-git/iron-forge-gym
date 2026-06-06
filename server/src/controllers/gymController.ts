import { Request, Response, NextFunction } from 'express';
import { GymService } from '../services/gymService';
import { AuthenticatedRequest } from '../middlewares/auth';

export class GymController {
  // Memberships
  static async getMemberships(req: Request, res: Response, next: NextFunction) {
    try {
      const plans = await GymService.getMemberships();
      return res.status(200).json(plans);
    } catch (error) {
      next(error);
    }
  }

  static async createMembership(req: Request, res: Response, next: NextFunction) {
    try {
      const plan = await GymService.createMembership(req.body);
      return res.status(201).json(plan);
    } catch (error) {
      next(error);
    }
  }

  // Payments
  static async createOrder(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { membershipId } = req.body;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const order = await GymService.createPaymentOrder(userId, membershipId);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await GymService.verifyPaymentSignature(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Attendance
  static async checkIn(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const log = await GymService.logCheckIn(userId);
      return res.status(201).json({ success: true, log });
    } catch (error) {
      next(error);
    }
  }

  static async checkOut(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const log = await GymService.logCheckOut(userId);
      return res.status(200).json({ success: true, log });
    } catch (error) {
      next(error);
    }
  }

  // Analytics Overview
  static async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const analytics = await GymService.getAdminOverview();
      return res.status(200).json(analytics);
    } catch (error) {
      next(error);
    }
  }
}
