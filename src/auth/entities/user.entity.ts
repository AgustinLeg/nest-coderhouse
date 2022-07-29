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
  roles: string;

  @Prop({
    type: Date,
    isRequired: true,
    default: new Date().getTime(),
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
