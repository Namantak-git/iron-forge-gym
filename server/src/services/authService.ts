import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { z } from 'zod';
import { Role } from '@prisma/client';

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role).default(Role.MEMBER),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthService {
  static async register(data: any) {
    const validated = RegisterSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      throw { status: 400, message: 'User already exists with this email' };
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: validated.role,
      },
    });

    // Create profile based on role
    if (user.role === Role.MEMBER) {
      await prisma.memberProfile.create({
        data: { userId: user.id },
      });
    } else if (user.role === Role.TRAINER) {
      await prisma.trainerProfile.create({
        data: { userId: user.id },
      });
    }

    return this.generateUserSession(user);
  }

  static async login(data: any) {
    const validated = LoginSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    const validPassword = await bcrypt.compare(validated.password, user.password);
    if (!validPassword) {
      throw { status: 401, message: 'Invalid email or password' };
    }

    return this.generateUserSession(user);
  }

  private static generateUserSession(user: any) {
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
