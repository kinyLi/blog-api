import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({ description: '姓名' })
  name: string;

  @ApiProperty({ description: '性别' })
  sex: number;

  @ApiProperty({ description: '年龄' })
  age: number;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '手机' })
  phone: number;

  @ApiProperty({ description: '昵称' })
  nick: string;
}