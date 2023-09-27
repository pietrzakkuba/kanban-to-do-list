import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, minlength: 8, maxlength: 64})
  login: string;
  @Prop({required: true, minlength: 8, maxlength: 64})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);