import ProductModel, { Product } from "src/models/products";
import { ProductRepository } from "src/services/products/product-repository";

export const createProductRepository = (): ProductRepository => {
  const getAll = () => ProductModel.find({});

  const create = (data: Partial<Product>) => ProductModel.create(data);

  return { getAll, create };
};
