import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { GymController } from '../controllers/gymController';
import { FitnessController } from '../controllers/fitnessController';
import { authenticate, authorize } from '../middlewares/auth';
import { authLimiter } from '../middlewares/rateLimiter';
import { Role } from '@prisma/client';

const router = Router();

// --- Auth Routes ---
router.post('/auth/register', authLimiter, AuthController.register);
router.post('/auth/login', authLimiter, AuthController.login);
router.post('/auth/logout', AuthController.logout);

// --- Membership & Plan Routes ---
router.get('/memberships', GymController.getMemberships);
router.post('/memberships', authenticate, authorize([Role.ADMIN]), GymController.createMembership);

// --- Payment & Razorpay Routes ---
router.post('/payments/order', authenticate, authorize([Role.MEMBER]), GymController.createOrder);
router.post('/payments/verify', authenticate, GymController.verifyPayment);

// --- Attendance Routes ---
router.post('/attendance/checkin', authenticate, GymController.checkIn);
router.post('/attendance/checkout', authenticate, GymController.checkOut);

// --- Fitness & Training Routes ---
router.get('/trainers', FitnessController.getTrainers);
router.put('/trainers/profile', authenticate, authorize([Role.TRAINER]), FitnessController.updateTrainer);
router.get('/trainers/clients', authenticate, authorize([Role.TRAINER]), FitnessController.getClients);

// Workouts & Diets
router.get('/workouts', authenticate, authorize([Role.MEMBER]), FitnessController.getWorkout);
router.post('/workouts/assign', authenticate, authorize([Role.TRAINER]), FitnessController.assignWorkout);

router.get('/diets', authenticate, authorize([Role.MEMBER]), FitnessController.getDiet);
router.post('/diets/assign', authenticate, authorize([Role.TRAINER]), FitnessController.assignDiet);

// Progress logging
router.get('/progress', authenticate, authorize([Role.MEMBER]), FitnessController.getProgress);
router.post('/progress', authenticate, authorize([Role.MEMBER]), FitnessController.logProgress);

// --- Analytics Overview ---
router.get('/analytics/overview', authenticate, authorize([Role.ADMIN]), GymController.getOverview);

export default router;
