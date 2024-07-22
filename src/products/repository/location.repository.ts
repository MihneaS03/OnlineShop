import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../domain/location.domain';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async getById(id: string): Promise<Location | null> {
    return this.locationRepository.findOneBy({ id });
  }

  async create(location: Location): Promise<Location> {
    return await this.locationRepository.save(location);
  }

  async update(id: string, newLocation: Location): Promise<Location> {
    newLocation.id = id;
    return await this.locationRepository.save(newLocation);
  }

  async remove(id: string): Promise<void> {
    await this.locationRepository.delete(id);
  }
}
