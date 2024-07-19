import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @ApiProperty({ description: 'The description of the product' })
  description: string;

  @ApiProperty({ description: 'The price of the product' })
  price: number;

  @ApiProperty({ description: 'The weight of the product' })
  weight: number;

  @ApiProperty({ description: 'The supplier of the product' })
  supplier: string;

  @ApiProperty({ description: 'The url of the image belonging to the product' })
  imageUrl: string;

  @ApiProperty({ description: 'The id of the category of the product' })
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
