import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Life extends Document {
  @Prop({required: true})
  lifeTitle: string;

  @Prop({required: true})
  lifeContent: string;

  @Prop()
  lifeImages: string[];

  @Prop()
  lifeId: string;

  @Prop()
  lifeDate: number;

}

export const LifeSchema = SchemaFactory.createForClass(Life)