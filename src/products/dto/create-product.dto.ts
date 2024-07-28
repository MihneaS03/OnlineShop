import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ description: 'The name of the product' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the product' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'The weight of the product' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({ description: 'The supplier of the product' })
  @IsNotEmpty()
  @IsString()
  supplier: string;

  @ApiProperty({ description: 'The url of the image belonging to the product' })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: 'The id of the category of the product' })
  @IsNotEmpty()
  @IsUUID()
  category: string;

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    supplier: string,
    imageUrl: string,
    category: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
    this.category = category;
  }
}
