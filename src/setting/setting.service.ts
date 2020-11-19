import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './setting.schema';
import { SettingDto } from './dto/setting.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SettingService {

  constructor(
    @InjectModel(Setting.name) private readonly SettingModel: Model<Setting>
  ) {}

    async getUploadPath():Promise<string> {
      // 获取储存文件夹路径
      const uploadPath = await path.join(__dirname, 'upload',);
      return uploadPath;
    }

    async getSetting():Promise<any> {
      const uploadPath = await this.getUploadPath();
      // 读取储存文件下的所有文件
      const data = await fs.readdirSync(uploadPath);
      // 合并成路径,拼合文件名(后期实现覆盖流,将保存对应文件的文件名)
      const settingPath = await path.join(uploadPath, data[0])
      return settingPath;
    }

    async setSetting(settingDto: SettingDto):Promise<string> {
      // 存储逻辑
      // 文件流
      const data = await fs.readFileSync(settingDto.file.path);
      const uploadPath = await this.getUploadPath();

      // 检测文件夹是否存在 不存在则mkdir
      if(!fs.existsSync(uploadPath)) {
        try{
          await fs.mkdirSync(uploadPath);
        }catch (err) {
          console.log(err);
        }
      }

      // 合并文件名(统一文件名,实现覆盖流)
      const settingPath = await path.join(uploadPath, settingDto.file.name);
      try{
        await fs.writeFileSync(settingPath, data,{flag: 'as+'});
      }catch (err) {
        console.log(err);
      }
      return 'ok'
    }
}