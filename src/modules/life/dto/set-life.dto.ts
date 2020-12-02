import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SetLifeDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty()
  @IsString()
  lifeTitle: string;

  @ApiProperty({ description: '内容' })
  @IsNotEmpty()
  @IsString()
  lifeContent: string;

  @ApiProperty({description: '用户名'})
  @IsNotEmpty()
  @IsString()
  username: string;

  date: number;
}