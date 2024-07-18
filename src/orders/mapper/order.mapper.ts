import { Injectable } from '@nestjs/common';
import { OrderDTO } from '../dto/order.dto';
import { Order } from '../domain/order.domain';
import { Customer } from 'src/customers/domain/customer.domain';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';

@Injectable()
export class OrderMapper {
  mapOrderToOrderDTO(order: Order): OrderDTO {
    return new OrderDTO(
      order.customer.id,
      order.createdAt,
      order.addressCountry,
      order.addressCity,
      order.addressCounty,
      order.addressStreet,
    );
  }

  mapOrderDTOToOrder(orderDTO: OrderDTO, customer: Customer): Order {
    return new Order(
      customer,
      orderDTO.addressCountry,
      orderDTO.addressCity,
      orderDTO.addressCounty,
      orderDTO.addressStreet,
      orderDTO.createdAt,
    );
  }

  mapOrderToCreateOrderDTO(order: Order): CreateOrderDTO {
    return new CreateOrderDTO(
      order.customer.id,
      order.addressCountry,
      order.addressCity,
      order.addressCounty,
      order.addressStreet,
    );
  }

  mapCreateOrderDTOToOrder(
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

  mapOrderToUpdateOrderDTO(order: Order): UpdateOrderDTO {
    return new UpdateOrderDTO(
      order.customer.id,
      order.addressCountry,
      order.addressCity,
      order.addressCounty,
      order.addressStreet,
    );
  }

  mapUpdateOrderDTOToOrder(
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
