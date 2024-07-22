import { Injectable, NotFoundException } from '@nestjs/common';
import { Location } from '../domain/location.domain';
import { LocationRepository } from '../repository/location.repository';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async getAll(): Promise<Location[]> {
    return this.locationRepository.getAll();
  }

  async getById(id: string): Promise<Location | null> {
    const location: Location = await this.locationRepository.getById(id);
    if (!location) {
      throw new NotFoundException('The location was not found');
    }
    return location;
  }

  async create(location: Location): Promise<Location> {
    return await this.locationRepository.create(location);
  }

  async update(id: string, newLocation: Location): Promise<Location> {
    newLocation.id = id;
    return await this.locationRepository.update(id, newLocation);
  }

  async remove(id: string): Promise<void> {
    await this.locationRepository.remove(id);
  }
}
