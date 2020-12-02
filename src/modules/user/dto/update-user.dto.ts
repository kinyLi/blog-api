import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MASSAGE } from '../user.constant';
import { UserInfoDto } from './user-info.dto';

export class UpdateUserDto {

  @ApiProperty({description: '密码'})
  @IsNotEmpty({ message: MASSAGE.PASSWORD_NULL })
  password: string;

  @ApiProperty({description: '信息'})
  info: UserInfoDto;
}