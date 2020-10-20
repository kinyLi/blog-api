import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@ApiTags('用户相关')
export class UserController {
  @Get()
  @ApiOperation({ summary: '获取个人信息' })
  getUserInfo() {
    return [];
  }

  @Post()
  @ApiOperation({ summary: '注册新用户' })
  createUser(@Body() body: CreateUserDto, @Query() query, @Param() params) {
    return {
      success: true,
    };
  }

  @Get(':id')
  detail() {
    return {
      id: 111,
    };
  }
}
