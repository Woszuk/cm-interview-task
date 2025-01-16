import { createProduct } from "src/services/products/create-product";
import { getProducts } from "src/services/products/get-products";
import { ProductRepository } from "src/services/products/product-repository";
import { restockProduct } from "src/services/products/restock-product";
import { sellProduct } from "src/services/products/sell-product";

export const createProductServices = (productRepository: ProductRepository) => {
  return {
    getProducts: getProducts(productRepository),
    createProduct: createProduct(productRepository),
    restockProduct: restockProduct(productRepository),
    sellProduct: sellProduct(productRepository),
  };
};

export type ProductServices = ReturnType<typeof createProductServices>;
