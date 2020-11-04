import { Body, Controller, Delete, Get, Param, Post, Put, HttpException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateUserDto, QueryUserDto } from './dto/index';
import { UserService } from './user.service';
import { User } from './user.schema';
import { Result } from './user.interface';
import { CODE, MASSAGE } from './user.constant';
@Controller('user')
@ApiTags('用户相关')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('info')
  // @ApiOperation({ summary: '获取个人信息' })
  // async getUserInfo(): Promise<User[]> {
  //   return await this.userService.findAll();
  // }
  @Get()
  async index():Promise<string> {
    return 'hello user';
  }

  @Post('query')
  @ApiOperation({ summary: '查询个人' })
  async getUserInfo(@Body() body: QueryUserDto): Promise<User> {
    const info = await this.userService.findUsername(body.username);
    if(!info) {
      throw new HttpException(
        MASSAGE.USER_DOES_NOT_EXIST,
        CODE.USER_DOES_NOT_EXIST
      )
    }
    return info;
  }

  @Post('create')
  @ApiOperation({ summary: '注册新用户' })
  async createUser(@Body() body: CreateUserDto):Promise<Result<User>> {
    const data = await this.userService.create(body);
    return {
      statusCode: CODE.SUCCESS,
      message: MASSAGE.USER_CREATE_SUCCESS,
      data
    };
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async loginUser(@Body() body: LoginUserDto):Promise<Result> {
    const data = await this.userService.login(body);
    return {
      statusCode: CODE.SUCCESS,
      message: MASSAGE.LOGIN_OK,
      data
    };
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: '注销' })
  async deleteUser(@Param('id') id: string):Promise<Result> {
    const data = await this.userService.delete(id);
    return {
      statusCode: CODE.SUCCESS,
      message: MASSAGE.DELETE_SUCCESS,
      data
    }
  }

  @Put('update/:id')
  @ApiOperation({ summary: '更新资料' })
  async updateUser(@Param('id') id: string, @Body() updateInput: UpdateUserDto):Promise<Result> {
    const data = await this.userService.update(id, updateInput)
    return {
      statusCode: CODE.SUCCESS,
      message: MASSAGE.UPDATE_SUCCESS,
      data
    }
  }
}
