import { ProductCategoryDTO } from '../dto/product-category.dto';
import { ProductCategory } from '../domain/product-category.domain';
import { CreateProductCategoryDTO } from '../dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from '../dto/update-product-category.dto';

export class ProductCategoryMapper {
  mapProductCategoryToProductCategoryDTO(
    productCategory: ProductCategory,
  ): ProductCategoryDTO {
    return new ProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  mapProductCategoryDTOToProductCategory(
    productCategoryDTO: ProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      productCategoryDTO.name,
      productCategoryDTO.description,
    );
  }

  mapProductCategoryToCreateProductCategoryDTO(
    productCategory: ProductCategory,
  ): CreateProductCategoryDTO {
    return new CreateProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  mapCreateProductCategoryDTOToProductCategory(
    createProductCategoryDTO: CreateProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      createProductCategoryDTO.name,
      createProductCategoryDTO.description,
    );
  }

  mapProductCategoryToUpdateProductCategoryDTO(
    productCategory: ProductCategory,
  ): UpdateProductCategoryDTO {
    return new UpdateProductCategoryDTO(
      productCategory.name,
      productCategory.description,
    );
  }

  mapUpdateProductCategoryDTOToProductCategory(
    updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): ProductCategory {
    return new ProductCategory(
      updateProductCategoryDTO.name,
      updateProductCategoryDTO.description,
    );
  }
}
