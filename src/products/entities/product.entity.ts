/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @ApiProperty({
    example: 'Product 1',
    description: 'Product name',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'product-1',
    description: 'Product slug for SEO',
    uniqueItems: true,
  })
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  slug: string;

  @ApiProperty({
    example:
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Product principal image',
  })
  @Prop({
    required: true,
  })
  image: string;

  @ApiProperty({
    example: 0,
    description: 'Product stock',
  })
  @Prop({
    required: true,
    isInteger: true,
  })
  stock: number;

  @ApiProperty({
    example: 0,
    description: 'Product price',
  })
  @Prop({
    required: true,
    isInteger: true,
  })
  price: number;

  @ApiProperty({
    example:
      'containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    description: 'Product description',
  })
  @Prop({
    required: false,
    default: '',
  })
  description?: string;

  @ApiProperty({
    example: '2022-07-29T05:11:48.674Z',
    description: 'Product date it was created',
  })
  @Prop({
    type: Date,
    required: true,
    default: new Date().getTime(),
  })
  createdAt: Date;
}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.methods.toJSON = function () {
  const { __v, ...product } = this.toObject();
  return product;
};

export { ProductSchema };
