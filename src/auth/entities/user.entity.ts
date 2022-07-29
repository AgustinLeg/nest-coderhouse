/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    isRequired: true,
    index: true,
  })
  email: string;

  @Prop({
    isRequired: true,
  })
  password: string;

  @Prop({
    isRequired: true,
  })
  name: string;

  @Prop({
    isRequired: true,
  })
  lastName: string;

  @Prop({
    isRequired: true,
    default: true,
  })
  isActive: boolean;

  @Prop({
    isRequired: true,
    enum: ['USER', 'ADMIN', 'RESELLER'],
    default: 'USER',
  })
  role: string;

  @Prop({
    type: Date,
    isRequired: true,
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
