import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocationService } from '../service/location.service';
import axios from 'axios';
import { Public } from '../../auth/constants/auth.constants';
import { AvailableLocationDTO } from '../dto/available-location.dto';

@ApiBearerAuth()
@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('available')
  @Public()
  async getAvailableLocations(): Promise<AvailableLocationDTO[]> {
    const response = await axios.get(
      'https://raw.githubusercontent.com/catalin87/baza-de-date-localitati-romania/master/date/localitati.csv',
    );
    const locations: AvailableLocationDTO[] = [];

    const rows: string[] = response.data.trim().split('\n');
    for (const row of rows) {
      const locationString: string[] = row.split(',');
      locations.push(
        new AvailableLocationDTO(
          JSON.parse(locationString[0]),
          JSON.parse(locationString[1]),
          JSON.parse(locationString[2]),
          JSON.parse(locationString[3]),
          JSON.parse(locationString[4]),
          JSON.parse(locationString[5]),
          JSON.parse(locationString[6]),
          JSON.parse(locationString[7]),
          JSON.parse(locationString[8]),
        ),
      );
    }
    locations.shift();
    return locations;
  }
}
