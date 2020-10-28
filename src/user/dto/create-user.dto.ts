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