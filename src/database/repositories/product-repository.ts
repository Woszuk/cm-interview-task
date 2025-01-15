import ProductModel, { Product } from "src/models/products";
import { ProductRepository } from "src/services/products/product-repository";

export const createProductRepository = (): ProductRepository => {
  const getAll = () => ProductModel.find({});

  const create = (data: Partial<Product>) => ProductModel.create(data);

  const restock = (id: string) =>
    ProductModel.findByIdAndUpdate(id, { $inc: { stock: 1 } }, { returnDocument: "after" });

  return { getAll, create, restock };
};
