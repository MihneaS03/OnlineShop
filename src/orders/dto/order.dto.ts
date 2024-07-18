export class OrderDTO {
  customer: string;
  createdAt: Date;
  addressCountry: string;
  addressCity: string;
  addressCounty: string;
  addressStreet: string;

  constructor(
    customer: string,
    createdAt: Date,
    addressCountry: string,
    addressCity: string,
    addressCounty: string,
    addressStreet: string,
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.addressCountry = addressCountry;
    this.addressCity = addressCity;
    this.addressCounty = addressCounty;
    this.addressStreet = addressStreet;
  }
}
