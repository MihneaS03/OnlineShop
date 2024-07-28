import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDTO {
  @ApiProperty({ description: 'The name of the product category' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the product category' })
  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
