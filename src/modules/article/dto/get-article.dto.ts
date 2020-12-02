import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetArticleDto {
  @ApiProperty({ description: '条数' })
  @IsNotEmpty()
  limit: string;

  @ApiProperty({ description: '页数' })
  @IsNotEmpty()
  page: string;
}
