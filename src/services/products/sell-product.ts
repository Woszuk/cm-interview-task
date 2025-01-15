import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { ProductRepository } from "src/services/products/product-repository";

export const sellProduct = (productRepository: ProductRepository) => {
  return async ({ id, quantity }: { id: string; quantity: number }) => {
    const product = await productRepository.sell({ id, quantity });

    if (!product) {
      throw new EntityNotFoundError("Product not found", { ids: [id] });
    }

    return product;
  };
};
