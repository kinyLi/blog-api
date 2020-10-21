import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserResponse } from './user.interface';

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
  async createUser(@Body() body: CreateUserDto):Promise<UserResponse<User>> {
    return {
      code: 200,
      msg: 'ok',
      data: await this.userService.create(body)
    }
  }

  @Post('login')
  @ApiOperation({ summary: '登录'})
  async loginUser(@Body() body: LoginUserDto):Promise<UserResponse> {
    const data = await this.userService.login(body);
    if(data) {
      return {
        code: 200,
        msg: 'ok'
      }
    }
    return {
      code: 202,
      msg: 'fail'
    }
  }
}
