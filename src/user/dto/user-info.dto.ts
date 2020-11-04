import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UserInfoDto {
  @ApiProperty({ description: '姓名' })
  @IsString()
  name: string;

  @ApiProperty({ description: '性别' })
  @IsInt()
  sex: number; // 0 girl, 1 boy

  @ApiProperty({ description: '年龄' })
  @IsInt()
  age: number;

  @ApiProperty({ description: '邮箱' })
  @IsString()
  email: string;

  @ApiProperty({ description: '手机' })
  @IsInt()
  phone: number;

  @ApiProperty({ description: '昵称' })
  @IsString()
  nick: string;
}