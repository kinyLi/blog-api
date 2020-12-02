import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  info: {
    name: string,
    sex: number, // 0 girl / 1 boy
    age: number,
    email: string,
    phone: number,
    nick: string
  };
}

export const UserSchema = SchemaFactory.createForClass(User)