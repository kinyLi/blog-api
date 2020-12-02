import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SetArticleDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '内容' })
  @IsNotEmpty()
  @IsString()
  content: string;

  date: number;
}