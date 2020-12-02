import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryArticleDto {
  @ApiProperty({description: '关键字'})
  keyword: string;

  @ApiProperty({description: '开始时间'})
  startTime: string;

  @ApiProperty({description: '结束时间'})
  endTime: string;

}
