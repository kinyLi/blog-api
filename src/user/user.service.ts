import { Injectable,HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { User } from './user.schema';
import { MASSAGE, CODE } from './user.constant';
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

  // 查询用户名是否存在
  async findUsername( username: string):Promise<User> {
    return await this.userModel.findOne({username}).exec();
  }

  // 创建用户
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;
    // const { name, sex, age, email, phone } = info;
    // if(!nick) {
    //   createUserDto.nick =
    // }
    // 查询用户是否存在
    const user = await this.findUsername(username);
    let data = {}
    if(!user) {
      // hash密码加密 密文保存密码
      createUserDto.password = await bcrypt.hash(password, saltRounds)

      // 数据库存储新用户
      const createdUser = new this.userModel(createUserDto);
      createdUser.save();

      // 创建成功
      data = {
        msg: MASSAGE.USER_CREATE_SUCCESS,
        code: CODE.USER_CREATE_SUCCESS
      }
    } else {
      // TODO: 更改使用 HttpException 来返回失败信息
      // throw new HttpException(`用户已存在,创建失败`, 403)
      // 用户存在
      data = {
        msg: MASSAGE.USER_ALREADY_EXISTS,
        code: CODE.USER_ALREADY_EXISTS
      }
    }
    return data;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const {username, password} = loginUserDto;

    // 查询用户是否存在
    const user = await this.findUsername(username);
    let data = {};
    if(user) {
      // 前端明文密码对比后端密文密码
      const isOk = await bcrypt.compare(password, user.password);
      data = {
        code: isOk ? CODE.LOGIN_OK : CODE.PASSWORD_ERROR,
        msg: isOk ? MASSAGE.LOGIN_OK : MASSAGE.PASSWORD_ERROR
      }
    } else {
        data = {
        code: CODE.USER_DOES_NOT_EXIST,
        msg: MASSAGE.USER_DOES_NOT_EXIST
      }
    }
    return data;
  }
}
