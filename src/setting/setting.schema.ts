import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Setting extends Document {
  @Prop({required: true})
  url: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting)