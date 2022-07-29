import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(3)
  readonly slug: string;
  @IsInt()
  @IsPositive()
  readonly stock: number;
  @IsInt()
  @IsPositive()
  readonly price: number;
  @IsString()
  @IsUrl()
  readonly image: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly description?: string;
}
