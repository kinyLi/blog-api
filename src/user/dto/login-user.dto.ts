import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '用户名' })
  username: string;
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '邮箱' })
  email: string;
}
// token 下发及验证
