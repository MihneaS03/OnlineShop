import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductCategoryDTO {
  @ApiProperty({ description: 'The name of the product category' })
  name: string;

  @ApiProperty({ description: 'The description of the product category' })
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
