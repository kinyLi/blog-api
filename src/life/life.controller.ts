import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LifeService } from './life.service';
import { SetLifeDto, CacheLifeDto, GetCacheLifeDto } from './dto';
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
  @ApiOperation({ summary: '获取缓存区图片' })
  async getCacheLife(@Query() query: GetCacheLifeDto): Promise<Result>{
    const data = await this.lifeService.getCacheLife(query.username);
    return {
      statusCode: 200,
      message: 'ok',
      data
    };
  }

  @Post( 'cache')
  @ApiOperation({ summary: '发布缓存区' })
  async cacheLifeImage(@Req() req: CacheLifeDto) {
    return await this.lifeService.cacheLifeImage(req)
  }

  @Get('getLife')
  @ApiOperation({summary: '查询'})
  async getLife() {
    const data = await this.lifeService.getLife();
    return {
      statusCode: 200,
      message: 'ok',
      data
    }
  }

  @Post('setLife')
  @ApiOperation({ summary: '发布' })
  async setLife(@Body() body: SetLifeDto): Promise<Result>{
    const data = await this.lifeService.setLife(body)

    return {
      statusCode: 200,
      message: 'ok',
      data
    }
  }
}