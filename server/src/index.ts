import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { logger } from './config/logger';
import apiRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { globalLimiter } from './middlewares/rateLimiter';

const app = express();
const server = http.createServer(app);

// Initialize Socket.io for Real-Time Operations
const io = new Server(server, {
  cors: {
    origin: '*', // In production, replace with Next.js frontend domain
    methods: ['GET', 'POST'],
  },
});

// Middleware integrations
app.use(helmet()); // Basic security headers protection
app.use(cors()); // Configure Cross-Origin Resource Sharing
app.use(express.json()); // Body parser
app.use(globalLimiter); // Protect API rate limitations

// Attach Socket.io to Express Request for controllers to access
app.use((req: any, res, next) => {
  req.io = io;
  next();
});

// Mounting Routing Engine
app.use('/api', apiRoutes);

// Socket.io Real-Time Handlers
io.on('connection', (socket) => {
  logger.info(`🔌 Realtime Client Connected: ${socket.id}`);

  // User joins a room named after their userId for targeted alerts
  socket.on('join', (userId: string) => {
    socket.join(userId);
    logger.debug(`User ${userId} joined target socket room`);
  });

  socket.on('disconnect', () => {
    logger.info(`🔌 Realtime Client Disconnected: ${socket.id}`);
  });
});

// Global Error Handler Integration
app.use(errorHandler);

// Launching Backend API Server
const PORT = env.PORT || '5000';
server.listen(PORT, () => {
  logger.info(`🚀 Iron Forge Gym Backend Server active on port ${PORT} [${env.NODE_ENV}]`);
});
