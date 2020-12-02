import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  content: string;

  @Prop()
  articleId: string;

  @Prop()
  date: number;

  @Prop()
  identiyu: number;

  @Prop()
  title_id: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
