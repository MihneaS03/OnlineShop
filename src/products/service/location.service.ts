import { Injectable, NotFoundException } from '@nestjs/common';
import { Location } from '../domain/location.domain';
import { LocationRepository } from '../repository/location.repository';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  getAllLocations(): Promise<Location[]> {
    return this.locationRepository.getAllLocations();
  }

  async getLocationById(id: string): Promise<Location | null> {
    const location: Location =
      await this.locationRepository.getLocationById(id);
    if (!location) {
      throw new NotFoundException('The location was not found');
    }
    return location;
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
