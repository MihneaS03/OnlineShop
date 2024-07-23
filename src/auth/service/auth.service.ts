import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from 'src/customers/domain/customer.domain';
import { CustomerService } from 'src/customers/service/customer.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
      await this.customerService.getCustomerByUsername(username);

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

  async login(customer: Partial<Customer>): Promise<any> {
    const validatedCustomer: Partial<Customer> = await this.validateCustomer(
      customer.username,
      customer.password,
    );
    const payload = {
      username: validatedCustomer.username,
      sub: validatedCustomer.id,
    };

    return {
      ...customer,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(customer: Customer): Promise<any> {
    const payload = {
      username: customer.username,
      sub: {
        emailAddress: customer.emailAddress,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
