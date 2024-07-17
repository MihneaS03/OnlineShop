import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/customer.domain';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomersModule {}
