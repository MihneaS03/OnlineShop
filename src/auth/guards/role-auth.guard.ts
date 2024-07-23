import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { CustomerService } from 'src/customers/service/customer.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly customerService: CustomerService,
  ) {}

  matchRoles(roles: string[], role: string) {
    if (roles.includes(role)) {
      return true;
    }
    return false;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const customer = await this.customerService.getByUsername(
      request.user.username,
    );

    if (!this.matchRoles(roles, customer.role)) {
      throw new UnauthorizedException('You are not allowed to do this');
    }
    return true;
  }
}
