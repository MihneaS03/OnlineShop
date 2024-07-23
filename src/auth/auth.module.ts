import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { CustomersModule } from 'src/customers/customers.module';
import { CustomerService } from 'src/customers/service/customer.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    CustomersModule,
    JwtModule.register({
      secret: process.env.jwt_secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CustomerService,
    JwtService,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
