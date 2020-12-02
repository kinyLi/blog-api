import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './setting.schema';
import { SettingDto } from './dto/setting.dto';
import { settingImageHost } from '../../utils/constant';
import UploadCache from '../../upload';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SettingService {

  constructor(
    @InjectModel(Setting.name) private readonly SettingModel: Model<Setting>
  ) {}

    async getUploadPath():Promise<string> {
      // 获取储存文件夹路径
      return path.join(__dirname, 'upload',);
    }

    async getSettingFile():Promise<string> {
      const uploadPath = await this.getUploadPath();
      // 读取储存文件下的所有文件
      const data = await fs.readdirSync(uploadPath);

      // 返回文件
      if(data && data.length) {
        return settingImageHost + data[0]
      }
      return 'default.jpg';
    }

    async setSetting(settingDto: SettingDto):Promise<string> {
      // 存储逻辑
      // 文件流
      const data = await fs.readFileSync(settingDto.file.path);
      const cachePath = await UploadCache.cache({data, dataName:settingDto.file.name, cacheName: 'setting', type: 'local'});

      const settingUploadPath = await this.getUploadPath();
      // 检测文件夹是否存在 不存在则mkdir
      if(!fs.existsSync(settingUploadPath)) {
        try{
          await fs.mkdirSync(settingUploadPath);
        }catch (err) {
          console.log(err);
        }
      }

      // 合并文件名(统一文件名,实现覆盖流)
      const settingPath = await path.join(settingUploadPath, settingDto.file.name);
      try{
        // await fs.writeFileSync(settingPath, cachePath[0],{flag: 'as+'});
        await fs.renameSync(cachePath[0], settingPath)
      }catch (err) {
        console.log(err);
      }
      await UploadCache.delCachePath('setting')
      return await this.getSettingFile();
    }
}
