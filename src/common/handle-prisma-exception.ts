import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class HandlePrismaException {
  static conflict(message: string) {
    return (error: unknown): never => {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(message);
      }

      throw error;
    };
  }

  static notFound(message: string) {
    return (error: unknown): never => {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(message);
      }

      throw error;
    };
  }

  static foreignKey(message: string) {
    return (error: unknown): never => {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(message);
      }

      throw error;
    };
  }
}
