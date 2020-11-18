import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SettingService } from './Setting.service';
import { SettingDto } from './dto/setting.dto';

@Controller('Setting')
@ApiTags('后台管理设置')
export class SettingController {
  constructor(private readonly SettingService:SettingService) {}

  @Get()
  index() {
      return 'hello Setting'
  }

  @Get('setting')
  async getSetting() {
    const data = await this.SettingService.getSetting();
    return data;
  }

  @Post('setting')
  async settingUrl(@Body() body: SettingDto) {
    const data = await this.SettingService.setSetting(body);
    return data;
  }
}