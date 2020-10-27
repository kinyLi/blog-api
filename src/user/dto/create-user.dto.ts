import { ApiProperty } from '@nestjs/swagger';
import {UserInfo} from '../user.interface';
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({description: '信息'})
  info: UserInfo;
}
//  实名

// class CreateUserInfoDto {
//   @ApiProperty({ description: '昵称' })
//   name: string

//   @ApiProperty({ description: '性别' })
//   sex: number // 0 girl / 1 boy

//   @ApiProperty({ description: '年龄' })
//   age: number

//   @ApiProperty({ description: '邮箱' })
//   email: string

//   @ApiProperty({ description: '号码' })
//   phone: string

// }