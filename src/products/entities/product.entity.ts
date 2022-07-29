import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    unique: true,
    index: true,
    isRequired: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
    isRequired: true,
  })
  slug: string;
  @Prop({
    isRequired: true,
  })
  image: string;
  @Prop({
    isRequired: true,
    isInteger: true,
  })
  stock: number;
  @Prop({
    isRequired: true,
    isInteger: true,
  })
  price: number;
  @Prop({
    isRequired: false,
    default: '',
  })
  description?: string;

  @Prop({
    type: Date,
    isRequired: true,
    default: new Date().getTime(),
  })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
