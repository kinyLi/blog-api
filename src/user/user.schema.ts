import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true})
  nick: string;

  @Prop()
  info: {
    name: string,
    sex: string,
    age: string,
    email: string,
    phone: number,
  };
}

export const UserSchema = SchemaFactory.createForClass(User)