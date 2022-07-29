/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@Schema()
export class Order extends Document {
  @ApiProperty()
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  user: string;

  @ApiProperty()
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'Product' }] })
  orderItems: Product[];

  @ApiProperty()
  @Prop(
    raw({
      name: { type: String },
      lastName: { type: String },
      email: { type: String },
      address: { type: String, required: true },
      address2: { type: String },
      zip: { type: String },
      city: { type: String },
      country: { type: String },
      phone: { type: String },
    }),
  )
  shippingAddress: Record<string, any>;

  @ApiProperty({
    example: 2,
    description: 'Total products buy',
  })
  @Prop({
    required: true,
  })
  numberOfItems: number;
  @ApiProperty({
    example: 5000,
    description: 'Total',
    uniqueItems: true,
  })
  @Prop({
    required: true,
  })
  total: number;

  @ApiProperty({
    example: false,
    description: 'User paid order',
  })
  @Prop({
    required: true,
    default: false,
  })
  isPaid: boolean;

  @ApiProperty({
    example: new Date().getTime(),
    description: 'User paid date',
  })
  @Prop({
    required: true,
    default: new Date().getTime(),
  })
  paidAt: string;

  @ApiProperty({
    example: new Date().getTime(),
    description: 'Transaction paid id',
  })
  @Prop({
    required: true,
    default: new Date().getTime(),
  })
  transactionId: string;
}

const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.methods.toJSON = function () {
  const { __v, ...order } = this.toObject();
  return order;
};

export { OrderSchema };
