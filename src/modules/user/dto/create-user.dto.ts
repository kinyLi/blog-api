import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MASSAGE } from '../user.constant';
import { UserInfoDto } from './user-info.dto';
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({message: MASSAGE.PARAM_NULL})
  @IsString({message: MASSAGE.PARAM_TYPE_ERROR})
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({message: MASSAGE.PARAM_NULL})
  @IsString({message: MASSAGE.PARAM_TYPE_ERROR})
  password: string;

  @ApiProperty({description: '信息'})
  info: UserInfoDto;
}