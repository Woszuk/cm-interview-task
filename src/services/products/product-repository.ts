import { Product } from "src/models/products";

export type ProductRepository = {
  getAll(): Promise<Product[]>;
  create(data: Partial<Product>): Promise<Product>;
  restock(id: string): Promise<Product | null>;
  sell(id: string): Promise<Product | null>;
};
