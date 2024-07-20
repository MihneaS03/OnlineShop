import { LocationDTO } from '../dto/location.dto';
import { Location } from '../domain/location.domain';
import { CreateLocationDTO } from '../dto/create-location.dto';
import { UpdateLocationDTO } from '../dto/update-location.dto';

export class LocationMapper {
  mapLocationToLocationDTO(location: Location): LocationDTO {
    return new LocationDTO(
      location.name,
      location.addressCountry,
      location.addressCity,
      location.addressCounty,
      location.addressStreet,
    );
  }

  mapLocationDTOToLocation(locationDTO: LocationDTO): Location {
    return new Location(
      locationDTO.name,
      locationDTO.addressCountry,
      locationDTO.addressCity,
      locationDTO.addressCounty,
      locationDTO.addressStreet,
    );
  }

  mapLocationToCreateLocationDTO(location: Location): CreateLocationDTO {
    return new CreateLocationDTO(
      location.name,
      location.addressCountry,
      location.addressCity,
      location.addressCounty,
      location.addressStreet,
    );
  }

  mapCreateLocationDTOToLocation(
    createLocationDTO: CreateLocationDTO,
  ): Location {
    return new Location(
      createLocationDTO.name,
      createLocationDTO.addressCountry,
      createLocationDTO.addressCity,
      createLocationDTO.addressCounty,
      createLocationDTO.addressStreet,
    );
  }

  mapLocationToUpdateLocationDTO(location: Location): UpdateLocationDTO {
    return new UpdateLocationDTO(
      location.name,
      location.addressCountry,
      location.addressCity,
      location.addressCounty,
      location.addressStreet,
    );
  }

  mapUpdateLocationDTOToLocation(
    updateLocationDTO: UpdateLocationDTO,
  ): Location {
    return new Location(
      updateLocationDTO.name,
      updateLocationDTO.addressCountry,
      updateLocationDTO.addressCity,
      updateLocationDTO.addressCounty,
      updateLocationDTO.addressStreet,
    );
  }
}
