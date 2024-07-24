import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from '../../customers/domain/customer.domain';
import { CustomerService } from '../../customers/service/customer.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXPIRATION_REFRESH } from '../constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCustomer(
    username: string,
    password: string,
  ): Promise<Partial<Customer> | null> {
    const customer: Customer =
      await this.customerService.getByUsername(username);

    if (!customer) {
      throw new NotFoundException(
        'There is no customer with the given username',
      );
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      customer.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      username: customer.username,
      emailAddress: customer.emailAddress,
      orders: customer.orders,
    };
  }

  async login(user: Partial<Customer>): Promise<{
    username: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const customer = await this.customerService.getByUsername(user.username);
    const payload = {
      username: customer.username,
      sub: customer.id,
      role: customer.role,
    };

    return {
      username: customer.username,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: JWT_EXPIRATION_REFRESH,
      }),
    };
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
  }> {
    const decoded = await this.jwtService.decode(refreshToken);

    const payload = {
      username: decoded.username,
      sub: decoded.sub,
      role: decoded.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
