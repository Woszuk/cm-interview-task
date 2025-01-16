import { Product } from "src/models/product";

export type ProductRepository = {
  getAll(): Promise<Product[]>;
  create(data: Partial<Product>): Promise<Product>;
  restock({ id, quantity }: { id: string; quantity: number }): Promise<Product | null>;
  sell({ id, quantity }: { id: string; quantity: number }): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  findMany(ids: string[]): Promise<Product[]>;
};
