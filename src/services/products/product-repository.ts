import { Product } from "src/models/products";

export type ProductRepository = {
  getAll(): Promise<Product[]>;
};
