import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseService } from 'src/common/response/response.service';

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
}
