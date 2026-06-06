import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Unhandled Error: %o', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.errors,
    });
  }

  // Handle specific Prisma database errors if necessary
  if (err.code && err.code.startsWith('P')) {
    return res.status(500).json({
      error: 'Database transaction failed',
      code: err.code,
    });
  }

  const status = err.status || 500;
  const message = err.message || 'Internal server error occurred';

  res.status(status).json({
    error: message,
  });
};
