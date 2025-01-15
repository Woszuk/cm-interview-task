import { Request, Response } from "express";
import { CreateProductBody } from "src/schemas/product";
import { ProductServices } from "src/services/products";

export const createProductController = (productServices: ProductServices) => {
  return async (req: Request<{}, {}, CreateProductBody>, res: Response) => {
    const products = await productServices.createProduct(req.body);

    res.status(201).send(products);
  };
};
