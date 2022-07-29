/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: true,
    enum: ['USER', 'ADMIN', 'RESELLER'],
    default: 'USER',
  })
  role: string;

  @Prop({
    type: Date,
    required: true,
    default: new Date().getTime(),
  })
  createdAt: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

export { UserSchema };
