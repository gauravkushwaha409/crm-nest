import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseService } from 'src/common/response/response.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private responseService: ResponseService,
  ) {}

  @Post('/')
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDto) {
    const savedUser = await this.userService.createUser(body);
    return this.responseService.success(
      savedUser,
      'User created successfully',
      201,
    );
  }

  @Patch('/:id')
  @HttpCode(200)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updateUser = await this.userService.updateUser(id, body);
    return this.responseService.success(
      updateUser,
      'User updated successfully',
      201,
    );
  }
}
