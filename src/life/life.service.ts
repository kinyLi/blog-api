import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Life } from './life.schema';
import { SetLifeDto, CacheLifeDto } from './dto';
import UploadCache from '../upload';
import {lifeImageHost} from '../utils/constant';
import { FileItem } from './life.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LifeService {

  constructor(
    @InjectModel(Life.name) private readonly lifeModel: Model<Life>
  ) {}

  async getCacheLife(username): Promise<FileItem[]> {
    const files = await UploadCache.getCacheFile(username, 'host');
    return files.map((file) => {
      const fileName = path.basename(file)
      return {
        url: file,
        name: fileName
      }
    })
  }

  async setLife(setLifeDto: SetLifeDto):Promise<SetLifeDto | string> {
    // 添加创建时间
    const lifeModel = new this.lifeModel({
      ...setLifeDto,
      date: +(new Date().getTime().toString().substring(0, 10)),
    });
    // 转存缓存区文件
    const { _id, username } = lifeModel;
    const lifePath = path.join(__dirname, 'upload');
    const lifeIdPath = path.join(lifePath, _id.toString())
    const result = await UploadCache.cacheSaveTo(lifePath, lifeIdPath, username);
    if(result === 'fail') return 'fail';
    const files = await UploadCache.getTargetFiles(lifeIdPath, lifeImageHost + _id.toString() + '/');
    lifeModel.lifeImages = files;
    await lifeModel.save();
    // 数据库save成功后删除缓存区文件
    await UploadCache.delCachePath(username);
    return setLifeDto;
  }

  async cacheLifeImage(cacheLifeDto: CacheLifeDto) {
    const { files: { file }, body: { username } } = cacheLifeDto;
    const data = await fs.readFileSync(file.path);
    return UploadCache.cache({data, dataName: file.name, cacheName:username, type: 'host'});
  }
}