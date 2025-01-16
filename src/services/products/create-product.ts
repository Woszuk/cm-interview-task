import { ProductRepository } from "src/services/products/product-repository";

export const createProduct = (productRepository: ProductRepository) => {
  return async ({
    name,
    description,
    price,
    stock,
  }: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => {
    const product = await productRepository.create({ name, description, price, stock });

    return product;
  };
};
