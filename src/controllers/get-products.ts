import { Request, Response } from "express";
import { createProductServices } from "src/services/products";

export const getProductsController = async (_: Request, res: Response) => {
  const { getProducts } = createProductServices();

  const products = await getProducts();

  res.status(200).send(products);
};
