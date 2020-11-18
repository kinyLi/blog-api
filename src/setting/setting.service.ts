import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './Setting.schema';

@Injectable()
export class SettingService {

  constructor(
    @InjectModel(Setting.name) private readonly SettingModel: Model<Setting>
  ) {}

}