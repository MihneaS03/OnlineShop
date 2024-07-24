import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RefreshJwtGuard } from '../guards/refresh-jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../constants/auth.constants';
import { LoginDTO } from '../dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<{
    username: string;
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.authService.login(loginDTO);
  }

  @UseGuards(RefreshJwtGuard)
  @Public()
  @Post('refresh')
  async refreshToken(@Body() { refresh }: { refresh: string }): Promise<{
    accessToken: string;
  }> {
    return await this.authService.refreshToken(refresh);
  }
}
