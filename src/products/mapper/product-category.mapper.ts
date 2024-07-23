import { ProductCategoryDTO } from '../dto/product-category.dto';
import { ProductCategory } from '../domain/product-category.domain';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from '../dto/update-product-category.dto';

export class ProductCategoryMapper {
  static toDTO(productCategory: ProductCategory): ProductCategoryDTO {
    return new ProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  static toEntity(productCategoryDTO: ProductCategoryDTO): ProductCategory {
    return new ProductCategory(
      productCategoryDTO.name,
      productCategoryDTO.description,
    );
  }

  static toCreateDTO(
    productCategory: ProductCategory,
  ): CreateProductCategoryDTO {
    return new CreateProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  static createDTOToEntity(
    createProductCategoryDTO: CreateProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      createProductCategoryDTO.name,
      createProductCategoryDTO.description,
    );
  }

  static toUpdateDTO(
    productCategory: ProductCategory,
  ): UpdateProductCategoryDTO {
    return new UpdateProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  static updateDTOToEntity(
    updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      updateProductCategoryDTO.name,
      updateProductCategoryDTO.description,
    );
  }
}
