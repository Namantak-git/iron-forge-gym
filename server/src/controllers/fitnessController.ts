import { Request, Response, NextFunction } from 'express';
import { FitnessService } from '../services/fitnessService';
import { AuthenticatedRequest } from '../middlewares/auth';

export class FitnessController {
  // Trainers
  static async getTrainers(req: Request, res: Response, next: NextFunction) {
    try {
      const trainers = await FitnessService.getTrainers();
      return res.status(200).json(trainers);
    } catch (error) {
      next(error);
    }
  }

  static async updateTrainer(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const profile = await FitnessService.updateTrainerProfile(userId, req.body);
      return res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  // Clients list
  static async getClients(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const trainerUserId = req.user?.id;
      if (!trainerUserId) return res.status(401).json({ error: 'Unauthorized' });

      const clients = await FitnessService.getTrainerClients(trainerUserId);
      return res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  }

  // Workouts
  static async getWorkout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const plan = await FitnessService.getWorkoutPlan(userId);
      return res.status(200).json(plan);
    } catch (error) {
      next(error);
    }
  }

  static async assignWorkout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const trainerUserId = req.user?.id;
      if (!trainerUserId) return res.status(401).json({ error: 'Unauthorized' });

      const plan = await FitnessService.assignWorkoutPlan(trainerUserId, req.body);
      return res.status(201).json(plan);
    } catch (error) {
      next(error);
    }
  }

  // Diets
  static async getDiet(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const plan = await FitnessService.getDietPlan(userId);
      return res.status(200).json(plan);
    } catch (error) {
      next(error);
    }
  }

  static async assignDiet(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const trainerUserId = req.user?.id;
      if (!trainerUserId) return res.status(401).json({ error: 'Unauthorized' });

      const plan = await FitnessService.assignDietPlan(trainerUserId, req.body);
      return res.status(201).json(plan);
    } catch (error) {
      next(error);
    }
  }

  // Progress Logging
  static async getProgress(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const logs = await FitnessService.getProgressLogs(userId);
      return res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }

  static async logProgress(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const log = await FitnessService.logProgress(userId, req.body);
      return res.status(201).json(log);
    } catch (error) {
      next(error);
    }
  }
}
