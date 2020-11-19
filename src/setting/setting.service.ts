import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './Setting.schema';
import { SettingDto } from './dto/setting.dto';
import * as fs from 'fs';
import * as path from 'path';

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
      // 存储逻辑
      const data = await fs.readFileSync(settingDto.file.path);
      const uploadPath = await path.join(__dirname, 'upload',);
      const settingPath = await path.join(uploadPath, settingDto.file.name)
      await fs.mkdirSync(uploadPath);
      try{
        await fs.writeFileSync(settingPath, data,'binary')
      } catch (err) {
      }
      return 'ok'
    }
}