import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  username: string;
  @ApiProperty({ description: '密码' })
  password: string;
}
//  手机号 require 数据库密文存入
//  实名


export class LoginUserDto {
  @ApiProperty({ description: '用户名' })
  username: string;
  @ApiProperty({ description: '密码'})
  password: string;
}
// token 下发及验证
