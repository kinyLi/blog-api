import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CacheLifeDto {
    files: {
      file: file
    }
    body: Body
}

class Body {
  @ApiProperty({description: '用户名'})
  @IsNotEmpty()
  username: 'string';
}

class file {
  @ApiProperty({description: '文件路径'})
  @IsNotEmpty()
  @IsString()
  path: 'string';

  @ApiProperty({description: '文件名'})
  @IsNotEmpty()
  @IsString()
  name: 'string';
}