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
  async getAvailableLocations(): Promise<AvailableLocationDTO> {
    const response = await axios.get(
      'https://raw.githubusercontent.com/catalin87/baza-de-date-localitati-romania/master/date/localitati.csv',
    );
    const locations: AvailableLocationDTO[] = [];

    const rows: string[] = response.data.trim().split('\n');
    for (const row of rows) {
      const locationString: string[] = row.split(',');
      locations.push(
        new AvailableLocationDTO(
          locationString[0],
          locationString[1],
          locationString[2],
          locationString[3],
          locationString[4],
          locationString[5],
          locationString[6],
          locationString[7],
          locationString[8],
        ),
      );
    }
    console.log(locations[0]);
    return response.data;
  }
}
