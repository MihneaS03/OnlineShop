import { Injectable } from '@nestjs/common';
import { Location } from '../domain/location.domain';
import { LocationRepository } from '../repository/location.repository';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  getAllLocations(): Promise<Location[]> {
    return this.locationRepository.getAllLocations();
  }

  getLocationById(id: string): Promise<Location | null> {
    return this.locationRepository.getLocationById(id);
  }

  async createLocation(location: Location): Promise<Location> {
    return await this.locationRepository.createLocation(location);
  }

  async updateLocation(id: string, newLocation: Location): Promise<Location> {
    newLocation.id = id;
    return await this.locationRepository.updateLocation(id, newLocation);
  }

  async removeLocation(id: string): Promise<void> {
    await this.locationRepository.removeLocation(id);
  }
}
