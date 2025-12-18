import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(request: CreateUserDto) {
    const hashPassword = await bcrypt.hash(
      request.password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
    );
    try {
      const user = await this.prismaService.user.create({
        data: {
          profile: {
            create: {
              firstName: request.firstName,
              lastName: request.lastName,
              phone: request.phone,
            },
          },
          email: request.email,
          password: hashPassword,
          role: request.role,
        },
        select: {
          id: true,
          email: true,
          role: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      // 4. Handle unique constraint violation (email)
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }
}
