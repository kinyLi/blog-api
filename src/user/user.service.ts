import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { User } from './user.schema';
import { MASSAGE, CODE } from './user.constant';
import { CryptoUtil } from '../utils/crypto.util';
import { JwtUtil } from '../utils/jwt.util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  onModuleInit(): any {
    // init
  }
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    @Inject(JwtUtil) private readonly jwtUtil: JwtUtil
  ){}

  /**
   * 查询用户名
   * @param username 用户名
   */
  async findUsername( username: string ):Promise<User> {
    const info = await this.userModel.findOne({username},{password: 0}).exec();
    return info;
  }

  /**
   * 查询id
   * @param id id
   */
  async findId( id: string ):Promise<User> {
    return await this.userModel.findById(id);
  }

  /**
   * 创建用户
   * @param createUserDto
   */
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

  /**
   * 查询所有
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * 登录
   * @param loginUserDto
   */
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const {username, password, accessToken} = loginUserDto;

    // 存在accessToken则代表通过中间件校验,无需再次查询数据库
    if(accessToken) {
      return {
        username,
        accessToken
      }
    }

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

    const token = await this.jwtUtil.createToken(user, 600);
    return {username,accessToken: token};
  }

  /**
   * 删除用户
   * @param id 用户id
   */
  async delete(id: string): Promise<any> {
    // 查询用户
    const user = await this.findId(id);
    if(!user){
      throw new HttpException(
        MASSAGE.USER_DOES_NOT_EXIST,
        CODE.USER_DOES_NOT_EXIST
      )
    }

    // 删除用户
    await this.userModel.findByIdAndRemove(id);
  }

  /**
   * 更新用户资料
   * @param id 用户id
   * @param updateInput 更新数据
   */
  async update(id: string, updateInput: UpdateUserDto): Promise<any> {
    const user = await this.findId(id);
    if(!user){
      throw new HttpException(
        MASSAGE.USER_DOES_NOT_EXIST,
        CODE.USER_DOES_NOT_EXIST
      )
    }

    // 用户名不可更改
    // if(updateInput.username || updateInput._id) {
    //   throw new HttpException(
    //     MASSAGE.DISABLE_CHANGE_USERNAME,
    //     CODE.DISABLE_CHANGE_USERNAME
    //   )
    // }

    // 有修改密码的行为则需要对密码加盐
    if(updateInput.password) {
      updateInput.password = await this.cryptoUtil.encryptPassword(updateInput.password);
    }

    const updateUser = Object.assign(user, updateInput)
    const createdUser = new this.userModel(updateUser);
    createdUser.save()
    return updateInput;
  }
}
