import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { LifeService } from './life.service';
import { SetLifeDto, CacheLifeDto } from './dto';
import { Result } from './life.interface';

@Controller('life')
@ApiTags('生活相关')
export class LifeController {
  constructor(private readonly lifeService:LifeService) {}

  @Get()
  async index(): Promise<string> {
    return 'hello life';
  }

  @Get('getCache')
  async getCacheLife(@Query() query: {username: string}): Promise<Result>{
    const data = await this.lifeService.getCacheLife(query.username);
    return {
      statusCode: 200,
      message: 'ok',
      data
    };
  }

  @Post( 'cache')
  async cacheLifeImage(@Req() req: CacheLifeDto) {
    return await this.lifeService.cacheLifeImage(req)
  }

  @Post('set')
  async setLife(@Body() body: SetLifeDto): Promise<Result>{
    const data = await this.lifeService.setLife(body)

    return {
      statusCode: 200,
      message: 'ok',
      data
    }
  }
}