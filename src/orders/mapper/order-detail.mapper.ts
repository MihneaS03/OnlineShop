import { OrderDetail } from '../domain/order-detail.domain';
import { OrderDetailDTO } from '../dto/order-detail.dto';
import { OrderDTO } from '../dto/order.dto';
import { ProductDTO } from 'src/products/dto/product.dto';
import { LocationDTO } from 'src/products/dto/location.dto';

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
}
