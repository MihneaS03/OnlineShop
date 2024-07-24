export class AvailableLocationDTO {
  id: string;
  name: string;
  nameInRomanian: string;
  county: string;
  licensePlate: string;
  zip: string;
  population: string;
  latitude: string;
  longitude: string;

  constructor(
    id: string,
    name: string,
    nameInRomanian: string,
    county: string,
    licensePlate: string,
    zip: string,
    population: string,
    latitude: string,
    longitude: string,
  ) {
    this.id = id;
    this.name = name;
    this.nameInRomanian = nameInRomanian;
    this.county = county;
    this.licensePlate = licensePlate;
    this.zip = zip;
    this.population = population;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
