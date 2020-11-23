import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Life } from './life.schema';
import { SetLifeDto } from './dto';

@Injectable()
export class LifeService {

  constructor(
    @InjectModel(Life.name) private readonly lifeModel: Model<Life>
  ) {}

  async setLife(setLifeDto: SetLifeDto):Promise<SetLifeDto> {
    // 获取时间,精确到秒
    setLifeDto.date = +(new Date().getTime().toString()).substring(0, 10);
    await new this.lifeModel(setLifeDto).save();

    return setLifeDto;
  }

}