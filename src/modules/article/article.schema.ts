import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  content: string;

  @Prop()
  description: string;

  @Prop()
  date: number;

}

export const ArticleSchema = SchemaFactory.createForClass(Article)
