import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import {User} from './user.schema';

@Controller('user')
@ApiTags('用户相关')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '获取个人信息' })
  getUserInfo(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '注册新用户' })
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.create(body)
  }

  @Get(':id')
  detail() {
    return {
      id: 111,
    };
  }
}
