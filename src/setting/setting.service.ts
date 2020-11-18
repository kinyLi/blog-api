import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './Setting.schema';
import { SettingDto } from './dto/setting.dto';

@Injectable()
export class SettingService {

  constructor(
    @InjectModel(Setting.name) private readonly SettingModel: Model<Setting>
  ) {}

    async getSetting():Promise<any> {
      const data = await this.SettingModel.find();
      return data;
    }

    async setSetting(settingDto: SettingDto):Promise<string> {
      const setSetting = new this.SettingModel(settingDto);
      setSetting.save();
      return 'ok'
    }
}