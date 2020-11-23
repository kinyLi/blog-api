import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Life } from './life.schema';
import { LifeService } from './life.service';
import { SetLifeDto } from './dto';

@Controller('life')
@ApiTags('生活相关')
export class LifeController {
  constructor(private readonly lifeService:LifeService) {}

  @Get()
  async index() {
    return 'hello life';
  }

  @Post('set')
  async setLife(@Body() body: SetLifeDto) {
    const data = await this.lifeService.setLife(body)

    return {
      statusCode: 200,
      message: 'ok',
      data
    }
  }
}