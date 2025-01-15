import ProductModel from "src/models/products";
import { ProductRepository } from "src/services/products/product-repository";

export const createProductRepository = (): ProductRepository => {
  const getAll = () => ProductModel.find({});

  return { getAll };
};
