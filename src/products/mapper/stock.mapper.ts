import { StockDTO } from '../dto/stock.dto';
import { Stock } from '../domain/stock.domain';
import { CreateStockDTO } from '../dto/create-stock.dto';
import { UpdateStockDTO } from '../dto/update-stock.dto';
import { LocationDTO } from '../dto/location.dto';
import { ProductDTO } from '../dto/product.dto';

export class StockMapper {
  static toDTO(
    stock: Stock,
    productDTO: ProductDTO,
    locationDTO: LocationDTO,
  ): StockDTO {
    return new StockDTO(productDTO, locationDTO, stock.quantity);
  }

  static toEntity(
    stockDTO: StockDTO,
    productId: string,
    locationId: string,
  ): Stock {
    return new Stock(productId, locationId, stockDTO.quantity);
  }

  static toCreateDTO(stock: Stock): CreateStockDTO {
    return new CreateStockDTO(
      stock.product.id,
      stock.location.id,
      stock.quantity,
    );
  }

  static createDTOToEntity(createStockDTO: CreateStockDTO): Stock {
    return new Stock(
      createStockDTO.product,
      createStockDTO.location,
      createStockDTO.quantity,
    );
  }

  static toUpdateDTO(stock: Stock): UpdateStockDTO {
    return new UpdateStockDTO(
      stock.product.id,
      stock.location.id,
      stock.quantity,
    );
  }

  static updateDTOToEntity(updateStockDTO: UpdateStockDTO): Stock {
    return new Stock(
      updateStockDTO.product,
      updateStockDTO.location,
      updateStockDTO.quantity,
    );
  }
}
