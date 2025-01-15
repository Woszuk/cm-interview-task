import { ProductRepository } from "src/services/products/product-repository";

export const getProducts = (productRepository: ProductRepository) => {
  return async () => {
    const products = productRepository.getAll();

    return products;
  };
};
