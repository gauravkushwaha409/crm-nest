import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ResponseService } from 'src/common/response.service';
import { HandlePrismaException } from 'src/common/handle-prisma-exception';

@Injectable()
export class BranchService {
  private readonly logger = new Logger(BranchService.name);
  constructor(private prismaService: PrismaService) {}

  async create(request: CreateBranchDto) {
    try {
      return await this.prismaService.branch.create({
        data: {
          name: request.name,
          address: request.address,
          phone: request.phone,
          description: request.description,
        },
      });
    } catch (error) {
      HandlePrismaException.conflict('Branch already exist')(error);
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [branch, total] = await Promise.all([
      this.prismaService.branch.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'asc',
        },
      }),
      this.prismaService.branch.count(),
    ]);
    return {
      records: branch,
      meta: ResponseService.paginationMetaData(total, page, limit),
    };
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.branch.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      HandlePrismaException.notFound('Branch not found')(error);
    }
  }

  async update(id: string, request: UpdateBranchDto) {
    try {
      await this.prismaService.branch.update({
        where: { id: id },
        data: {
          name: request.name,
          address: request.address,
          phone: request.phone,
          description: request.description,
        },
      });
    } catch (error) {
      HandlePrismaException.notFound('Branch not found')(error);
    }
  }

  async remove(id: string) {
    try {
      return this.prismaService.branch.delete({
        where: { id: id },
      });
    } catch (error) {
      HandlePrismaException.notFound('Branch not found')(error);
    }
  }
}
