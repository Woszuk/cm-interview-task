import { Request, Response } from "express";
import { CreateProductBody } from "src/schemas/product";
import { createProductServices } from "src/services/products";

export const createProductController = async (
  req: Request<{}, {}, CreateProductBody>,
  res: Response
) => {
  const { createProduct } = createProductServices();

  const products = await createProduct(req.body);

  res.status(201).send(products);
};
