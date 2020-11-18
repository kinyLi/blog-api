import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Setting } from './Setting.schema';
import { SettingService } from './Setting.service';

@Controller('Setting')
@ApiTags('后台管理设置')
export class SettingController {
  constructor(private readonly SettingService:SettingService) {}

  @Get()
  index() {
      return 'hello Setting'
  }
}