import { OrderDetail } from '../domain/order-detail.domain';
import { OrderDetailDTO } from '../dto/order-detail.dto';
import { OrderDTO } from '../dto/order.dto';
import { ProductDTO } from 'src/products/dto/product.dto';
import { LocationDTO } from 'src/products/dto/location.dto';
import { CreateOrderDetailDTO } from '../dto/create-order-detail.dto';
import { Location } from 'src/products/domain/location.domain';
import { UpdateOrderDetailDTO } from '../dto/update-order-detail.dto';

export class OrderDetailMapper {
  mapOrderDetailToOrderDetailDTO(
    orderDetail: OrderDetail,
    orderDTO: OrderDTO,
    productDTO: ProductDTO,
    locationDTO: LocationDTO,
  ): OrderDetailDTO {
    return new OrderDetailDTO(
      orderDTO,
      productDTO,
      locationDTO,
      orderDetail.quantity,
    );
  }

  mapCreateOrderDetailDTOToOrderDetail(
    createOrderDetailDTO: CreateOrderDetailDTO,
    shippedFrom: Location,
  ): OrderDetail {
    return new OrderDetail(
      createOrderDetailDTO.order,
      createOrderDetailDTO.product,
      shippedFrom,
      createOrderDetailDTO.quantity,
    );
  }

  mapUpdateOrderDetailDTOToOrderDetail(
    updateOrderDetailDTO: UpdateOrderDetailDTO,
    shippedFrom: Location,
  ): OrderDetail {
    return new OrderDetail(
      updateOrderDetailDTO.order,
      updateOrderDetailDTO.product,
      shippedFrom,
      updateOrderDetailDTO.quantity,
    );
  }
}
