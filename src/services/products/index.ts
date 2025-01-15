import { createProductRepository } from "src/database/repositories/product-repository";
import { createProduct } from "src/services/products/create-product";
import { getProducts } from "src/services/products/get-products";

export const createProductServices = () => {
  const productRepository = createProductRepository();

  return {
    getProducts: getProducts(productRepository),
    createProduct: createProduct(productRepository),
  };
};
