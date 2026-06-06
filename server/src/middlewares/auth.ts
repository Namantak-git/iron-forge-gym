import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/prisma';
import { Role } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token && req.cookies) {
      token = req.cookies['auth-token'];
    }

    if (!token) {
      return res.status(401).json({ error: 'Authentication token required' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      email: string;
      role: Role;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'User session invalid or expired' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Session verification failed' });
  }
};

export const authorize = (roles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient permission' });
    }

    next();
  };
};
