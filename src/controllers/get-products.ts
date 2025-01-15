import { Request, Response } from "express";
import { ProductServices } from "src/services/products";

export const getProductsController = (productServices: ProductServices) => {
  return async (_: Request, res: Response) => {
    const products = await productServices.getProducts();

    res.status(200).send(products);
  };
};
