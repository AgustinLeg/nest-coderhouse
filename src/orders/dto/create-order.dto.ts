import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ShippingAddress {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  address2: string;

  @ApiProperty()
  @IsString()
  zip: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  phone: string;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsArray()
  orderItems: string[];

  @ApiProperty()
  @ValidateNested({ each: true })
  shippingAddress: ShippingAddress;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  total: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  numberOfItems: number;

  @ApiProperty()
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  paidAt: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  transactionId: string;
}
