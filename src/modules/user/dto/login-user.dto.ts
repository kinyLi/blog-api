import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MASSAGE } from '../user.constant';

export class LoginUserDto {

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({message: MASSAGE.PARAM_NULL})
  @IsString({message: MASSAGE.PARAM_TYPE_ERROR})
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({message: MASSAGE.PARAM_NULL})
  @IsString({message: MASSAGE.PARAM_TYPE_ERROR})
  password: string;

  @ApiProperty({ description: 'token' })
  accessToken: string;
}
// token 下发及验证
