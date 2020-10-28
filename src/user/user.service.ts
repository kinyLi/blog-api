import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { User } from './user.schema';
import { MASSAGE, CODE } from './user.constant';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class UserService implements OnModuleInit {
  onModuleInit(): any {
    // init
  }
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil
  ){}

  /**
   * 查询用户名
   * @param username 用户名
   */
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
    if(user) {
      // 用户存在
      throw new HttpException(MASSAGE.USER_ALREADY_EXISTS, CODE.USER_ALREADY_EXISTS)
    }
    // hash密码加密 密文保存密码
    createUserDto.password = await this.cryptoUtil.encryptPassword(password);
    // 数据库存储新用户
    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
    return {username};
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const {username, password} = loginUserDto;

    // 查询用户是否存在
    const user = await this.findUsername(username);
    if(!user) {
      // 用户不存在
      throw new HttpException(
        MASSAGE.USER_DOES_NOT_EXIST,
        CODE.USER_DOES_NOT_EXIST
      )
    }
    // 前端明文密码对比后端密文密码
    const result = await this.cryptoUtil.checkPassword(password, user.password);
    if(!result) {
      // 密码错误
      throw new HttpException(
        MASSAGE.PASSWORD_ERROR,
        CODE.PASSWORD_ERROR
      )
    }

    // TODO: 颁发jwt
    return {username};
  }
}
