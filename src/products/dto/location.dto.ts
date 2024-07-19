export class LocationDTO {
  name: string;
  addressCountry: string;
  addressCity: string;
  addressCounty: string;
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
