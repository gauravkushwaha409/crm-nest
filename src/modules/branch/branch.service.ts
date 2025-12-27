import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private prismaService: PrismaService) {}

  async create(request: CreateBranchDto) {
    const savedBranch = await this.prismaService.branch.create({
      data: {
        name: request.name,
        address: request.address,
        phone: request.phone,
        description: request.description,
      },
    });
    return savedBranch;
  }

  findAll() {
    return `This action returns all branch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
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
      if (error.code === 'P2025')
        throw new NotFoundException('Branch Not found');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
