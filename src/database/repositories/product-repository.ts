import ProductModel, { Product } from "src/models/product";
import { ProductRepository } from "src/services/products/product-repository";

export const createProductRepository = (): ProductRepository => {
  const getAll = () => ProductModel.find({});

  const create = (data: Partial<Product>) => ProductModel.create(data);

  const restock = ({ id, quantity }: { id: string; quantity: number }) =>
    ProductModel.findByIdAndUpdate(id, { $inc: { stock: quantity } }, { returnDocument: "after" });

  const sell = ({ id, quantity }: { id: string; quantity: number }) =>
    ProductModel.findOneAndUpdate(
      { _id: id, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { returnDocument: "after" }
    );

  const findMany = (ids: string[]) => ProductModel.find({ _id: { $in: ids } });

  return { getAll, create, restock, sell, findMany };
};
