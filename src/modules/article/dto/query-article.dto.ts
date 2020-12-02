import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryArticleDto {
  @ApiProperty({description: '关键字'})
  @IsNotEmpty()
  @IsString()
  keyword: string;
}
