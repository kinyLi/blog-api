import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Life } from './life.schema';
import { SetLifeDto, CacheLifeDto } from './dto';
import UploadCache from '../upload';
import getNextIdValue from '../utils/getNextIdValue';
import * as fs from 'fs';

@Injectable()
export class LifeService {

  constructor(
    @InjectModel(Life.name) private readonly lifeModel: Model<Life>
  ) {}

  async setLife(setLifeDto: SetLifeDto):Promise<SetLifeDto> {
    const { username, lifeTitle, lifeContent } = setLifeDto;
    // 获取时间,精确到秒
    setLifeDto.date = +(new Date().getTime().toString()).substring(0, 10);
    const lifeModel = await new this.lifeModel(setLifeDto);
    // TODO: 需要唯一id创建文件夹进行存储
    const _id = getNextIdValue(lifeModel.db.collection('counters'),1)
    return setLifeDto;
  }

  async cacheLifeImage(cacheLifeDto: CacheLifeDto) {
    const { files: { file }, body: { username } } = cacheLifeDto;
    const data = await fs.readFileSync(file.path);
    return UploadCache.cache({data, dataName: file.name, cacheName:username, type: 'host'});
  }
}