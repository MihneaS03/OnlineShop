import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockDTO {
  @ApiProperty({
    description: 'The id of the product to which the stock belongs',
  })
  @IsNotEmpty()
  @IsUUID()
  product: string;

  @ApiProperty({
    description: 'The id of the location to which the stock belongs',
  })
  @IsNotEmpty()
  @IsUUID()
  location: string;

  @ApiProperty({ description: 'The quantity in the stock' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  constructor(product: string, location: string, quantity: number) {
    this.product = product;
    this.location = location;
    this.quantity = quantity;
  }
}
