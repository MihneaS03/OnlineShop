import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { CustomersModule } from '../customers/customers.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_EXPIRATION } from './constants/auth.constants';

@Module({
  imports: [
    CustomersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: JWT_EXPIRATION },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthModule {}
