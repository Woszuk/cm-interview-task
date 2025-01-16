import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { StockInsufficientError } from "src/errors/StockInsufficientError";
import { ProductRepository } from "src/services/products/product-repository";

export const sellProduct = (productRepository: ProductRepository) => {
  return async ({ id, quantity }: { id: string; quantity: number }) => {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new EntityNotFoundError("Product not found", { ids: [id] });
    }

    const changedProduct = await productRepository.sell({ id, quantity });

    if (!changedProduct) {
      throw new StockInsufficientError(`Insufficient stock for product ${product.name}`, {
        stock: product.stock,
        quantity: quantity,
        id: id,
      });
    }

    return changedProduct;
  };
};
