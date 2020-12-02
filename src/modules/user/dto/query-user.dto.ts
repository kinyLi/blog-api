import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MASSAGE } from '../user.constant';


export class QueryUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({message: MASSAGE.PARAM_NULL})
  @IsString({message: MASSAGE.PARAM_TYPE_ERROR})
  username: string;
}