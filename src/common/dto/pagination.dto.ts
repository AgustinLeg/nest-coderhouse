import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    default: 8,
    description: 'How many products do you need',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit: number;

  @ApiProperty({
    default: 0,
    description: 'How many products do you want to skip',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset: number;
}
