import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ResponseService } from 'src/common/response.service';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  async create(@Body() createBranchDto: CreateBranchDto) {
    const response = await this.branchService.create(createBranchDto);
    return ResponseService.success(response, 'Branch Create successfully', 201);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const { page, limit } = pagination;
    const response = await this.branchService.findAll(page, limit);
    return ResponseService.pagination(response.records, response.meta);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const branchDetails = await this.branchService.findOne(id);
    return ResponseService.success(
      branchDetails,
      'Branch details retrieved',
      200,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    const updatedBrach = await this.branchService.update(id, updateBranchDto);
    return ResponseService.success(
      updatedBrach,
      'Branch updated successfully',
      200,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedBranch = await this.branchService.remove(id);
    return ResponseService.success(
      deletedBranch,
      'Branch deleted successfully',
      200,
    );
  }
}
