import { IsArray, IsNotEmpty, IsString } from 'class-validator';
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

  @ApiProperty({description: '相册'})
  @IsArray()
  lifeImages: string[];

  date: number;
}