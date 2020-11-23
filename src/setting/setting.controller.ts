import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { SettingService } from './setting.service';

@Controller('setting')
@ApiTags('后台管理设置')
export class SettingController {
  constructor(private readonly SettingService:SettingService) {}

  @Get()
  index() {
      return 'hello Setting'
  }

  @Get('setting')
  async getSetting() {
    const data = await this.SettingService.getSettingFile();
    return data;
  }

  @Post('setting')
  async settingUrl(@Req() req) {
    const files = req.files;
    const data = await this.SettingService.setSetting(files)
    return data;
  }
}