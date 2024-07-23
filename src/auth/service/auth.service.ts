import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from 'src/customers/domain/customer.domain';
import { CustomerService } from 'src/customers/service/customer.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateCustomer(
    username: string,
    password: string,
  ): Promise<Partial<Customer> | null> {
    const customer: Customer =
      await this.customerService.getByUsername(username);

    if (customer && (await bcrypt.compare(password, customer.password))) {
      return {
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        username: customer.username,
        emailAddress: customer.emailAddress,
        orders: customer.orders,
      };
    } else {
      if (!customer) {
        throw new NotFoundException(
          'There is no customer with the given username',
        );
      }

      if (!(await bcrypt.compare(password, customer.password))) {
        throw new UnauthorizedException(
          'The username-password combination is not correct',
        );
      }
    }
    return null;
  }

  async login(user: Partial<Customer>): Promise<any> {
    const customer = await this.customerService.getByUsername(user.username);
    const payload = {
      username: customer.username,
      sub: customer.id,
    };

    return {
      username: customer.username,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  refreshToken(refreshToken: string): any {
    const decoded = this.jwtService.decode(refreshToken);

    const payload = {
      username: decoded.username,
      sub: decoded.sub,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
