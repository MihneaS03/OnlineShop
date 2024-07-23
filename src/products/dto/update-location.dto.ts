import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDTO {
  @ApiProperty({ description: 'The name of the location' })
  name: string;

  @ApiProperty({ description: 'The country of the location' })
  addressCountry: string;

  @ApiProperty({ description: 'The city of the location' })
  addressCity: string;

  @ApiProperty({ description: 'The county of the location' })
  addressCounty: string;

  @ApiProperty({ description: 'The street of the location' })
  addressStreet: string;

  constructor(
    name: string,
    addressCountry: string,
    addressCity: string,
    addressCounty: string,
    addressStreet: string,
  ) {
    this.name = name;
    this.addressCountry = addressCountry;
    this.addressCity = addressCity;
    this.addressCounty = addressCounty;
    this.addressStreet = addressStreet;
  }
}
