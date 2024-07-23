import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/customer.domain';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './service/customer.service';
import { CustomerMapper } from './mapper/customer.mapper';
import { CustomerController } from './controller/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerRepository, CustomerService, CustomerMapper],
  controllers: [CustomerController],
  exports: [CustomerService, CustomerMapper],
})
export class CustomersModule {}
