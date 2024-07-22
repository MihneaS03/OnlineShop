import { OrderDTO } from '../dto/order.dto';
import { Order } from '../domain/order.domain';
import { Customer } from 'src/customers/domain/customer.domain';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { CustomerDTO } from 'src/customers/dto/customer.dto';

export class OrderMapper {
  static toDTO(order: Order, customerDTO: CustomerDTO): OrderDTO {
    return new OrderDTO(
      customerDTO,
      order.createdAt,
      order.addressCountry,
      order.addressCity,
      order.addressCounty,
      order.addressStreet,
    );
  }

  static toEntity(orderDTO: OrderDTO, customer: Customer): Order {
    return new Order(
      customer,
      orderDTO.addressCountry,
      orderDTO.addressCity,
      orderDTO.addressCounty,
      orderDTO.addressStreet,
      orderDTO.createdAt,
    );
  }

  static toCreateDTO(order: Order): CreateOrderDTO {
    return new CreateOrderDTO(
      order.customer.id,
      order.addressCountry,
      order.addressCity,
      order.addressCounty,
      order.addressStreet,
    );
  }

  static createDTOToEntity(
    createOrderDTO: CreateOrderDTO,
    customer: Customer,
  ): Order {
    return new Order(
      customer,
      createOrderDTO.addressCountry,
      createOrderDTO.addressCity,
      createOrderDTO.addressCounty,
      createOrderDTO.addressStreet,
    );
  }

  static toUpdateDTO(order: Order): UpdateOrderDTO {
    return new UpdateOrderDTO(
      order.customer.id,
      order.addressCountry,
      order.addressCity,
      order.addressCounty,
      order.addressStreet,
    );
  }

  static updateDTOToEntity(
    updateOrderDTO: UpdateOrderDTO,
    customer: Customer,
  ): Order {
    return new Order(
      customer,
      updateOrderDTO.addressCountry,
      updateOrderDTO.addressCity,
      updateOrderDTO.addressCounty,
      updateOrderDTO.addressStreet,
    );
  }
}
