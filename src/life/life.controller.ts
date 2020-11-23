import { Controller, Get, Post, Body, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LifeService } from './life.service';
import { SetLifeDto, CacheLifeDto } from './dto';

export interface Result<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

@Controller('life')
@ApiTags('生活相关')
export class LifeController {
  constructor(private readonly lifeService:LifeService) {}

  @Get()
  async index(): Promise<string> {
    return 'hello life';
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