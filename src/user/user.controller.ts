import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserResponse } from './user.interface';
import { CODE, MASSAGE } from './user.constant';
@Controller('user')
@ApiTags('用户相关')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @ApiOperation({ summary: '获取个人信息' })
  async getUserInfo(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: '注册新用户' })
  async createUser(@Body() body: CreateUserDto):Promise<UserResponse<User>> {
    const data = await this.userService.create(body);
    return {
      statusCode: CODE.USER_CREATE_SUCCESS,
      message: MASSAGE.USER_CREATE_SUCCESS,
      data
    };
  }

  @Post('login')
  @ApiOperation({ summary: '登录'})
  async loginUser(@Body() body: LoginUserDto):Promise<UserResponse> {
    const data = await this.userService.login(body);
    return {
      statusCode: CODE.LOGIN_OK,
      message: MASSAGE.LOGIN_OK,
      data
    };
  }
}
