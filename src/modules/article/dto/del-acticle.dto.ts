import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteArticleDto {
  @ApiProperty({ description: '文章id' })
  @IsNotEmpty()
  id: string;
}
