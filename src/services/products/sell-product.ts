import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { ProductRepository } from "src/services/products/product-repository";

export const sellProduct = (productRepository: ProductRepository) => {
  return async (id: string) => {
    const product = await productRepository.sell(id);

    if (!product) {
      throw new EntityNotFoundError("Product not found", { id });
    }

    return product;
  };
};
