import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';
import { Customer } from '../../customers/domain/customer.domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Partial<Customer> | null> {
    return await this.authService.validateCustomer(username, password);
  }
}
