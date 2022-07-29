import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  readonly slug: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsString()
  @IsUrl()
  readonly image: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly description?: string;
}
