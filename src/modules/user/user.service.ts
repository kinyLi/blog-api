import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './user.schema';
import { MASSAGE, CODE } from './user.constant';
import { CryptoUtil } from '../../utils/crypto.util';
import { JwtUtil } from '../../utils/jwt.util';
import { UserGetInfo } from './user.interface';

@Injectable()
export class UserService implements OnModuleInit {
  onModuleInit(): void {
    // init
  }
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    @Inject(JwtUtil) private readonly jwtUtil: JwtUtil
  ){}

  /**
   * 查询用户名,系统调用传密码
   * @param username 用户名
   * @param password 密码
   */
  async findUsername( username: string, password?: string ):Promise<User> {
    // 前端查询需要屏蔽密码返回,后端查询需要返回密码比对
    return await this.userModel.findOne({username},{password: password ? 1 : 0}).exec();
  }

  /**
   * 查询id
   * @param id id
   */
  async findId( id: string ):Promise<User> {
    return this.userModel.findById(id);
  }

  /**
   * 创建用户
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<UserGetInfo> {
    const { username, password } = createUserDto;
    // 查询用户是否存在
    const user = await this.findUsername(username, password);
    if(user) {
      // 用户存在
      throw new HttpException(MASSAGE.USER_ALREADY_EXISTS, CODE.USER_ALREADY_EXISTS)
    }
    // hash密码加密 密文保存密码
    createUserDto.password = await this.cryptoUtil.encryptPassword(password);
    // 数据库存储新用户
    await new this.userModel(createUserDto).save()
    return {username};
  }

  /**
   * 登录
   * @param loginUserDto
   */
  async login(loginUserDto: LoginUserDto): Promise<UserGetInfo> {
    const {username, password, accessToken} = loginUserDto;
    // 存在accessToken则代表通过中间件校验,无需再次查询数据库
    if(accessToken) {
      return {
        username,
        accessToken
      }
    }

    // 查询用户是否存在
    const user = await this.findUsername(username, password);
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
  async delete(id: string): Promise<UserGetInfo> {
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
    return {
      username: user.username
    }
  }

  /**
   * 更新用户资料
   * @param id 用户id
   * @param updateInput 更新数据
   */
  async update(id: string, updateInput: UpdateUserDto): Promise<UserGetInfo> {
    const user = await this.findId(id);
    if(!user){
      throw new HttpException(
        MASSAGE.USER_DOES_NOT_EXIST,
        CODE.USER_DOES_NOT_EXIST
      )
    }

    // 有修改密码的行为则需要对密码加盐
    if(updateInput.password) {
      updateInput.password = await this.cryptoUtil.encryptPassword(updateInput.password);
    }

    const updateUser = Object.assign(user, updateInput)
    await new this.userModel(updateUser).save();
    return {userInfo: updateInput.info};
  }
}
