import { CustomerDTO } from '../dto/customer.dto';
import { Customer } from '../domain/customer.domain';
import { CreateCustomerDTO } from '../dto/create-customer.dto';

export class CustomerMapper {
  mapCustomerToCustomerDTO(customer: Customer): CustomerDTO {
    return new CustomerDTO(
      customer.firstName,
      customer.lastName,
      customer.username,
      customer.emailAddress,
    );
  }

  mapCustomerToCreateCustomerDTO(customer: Customer): CreateCustomerDTO {
    return new CreateCustomerDTO(
      customer.firstName,
      customer.lastName,
      customer.username,
      customer.password,
      customer.emailAddress,
    );
  }

  mapCreateCustomerDTOToCustomer(
    createCustomerDTO: CreateCustomerDTO,
  ): Customer {
    return new Customer(
      createCustomerDTO.firstName,
      createCustomerDTO.lastName,
      createCustomerDTO.username,
      createCustomerDTO.password,
      createCustomerDTO.emailAddress,
    );
  }
}
