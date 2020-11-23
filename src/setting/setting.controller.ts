import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { SettingService } from './setting.service';

@Controller('setting')
@ApiTags('后台管理设置')
export class SettingController {
  constructor(private readonly settingService:SettingService) {}

  @Get()
  async index(): Promise<string> {
      return 'hello Setting'
  }

  @Get('setting')
  async getSetting(): Promise<string> {
    return await this.settingService.getSettingFile();
  }

  @Post('setting')
  async settingUrl(@Req() req: {files}): Promise<string> {
    const files = req.files;
    return await this.settingService.setSetting(files);
  }
}