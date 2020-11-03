import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MASSAGE } from '../user.constant';

export class UpdateUserDto {

  @ApiProperty({description: '密码'})
  @IsNotEmpty({ message: MASSAGE.PASSWORD_NULL })
  password: string;

  @ApiProperty({description: '信息'})
  info: {
    name?: string,
    sex?: number,
    age?: number,
    email?: string,
    phone?: number,
    nick?: string
  };
}