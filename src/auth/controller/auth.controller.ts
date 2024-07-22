import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RefreshJwtGuard } from '../guards/refresh-jwt-auth.guard';
import { JwtGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtGuard)
  @Post()
  async login(@Request() req) {
    return await this.authService.login(req.customer);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
