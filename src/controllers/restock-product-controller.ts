import { NextFunction, Request, Response } from "express";
import { RestockProductBody, RestockProductParams } from "src/schemas/product";
import { ProductServices } from "src/services/products";

export const restockProductController = (productServices: ProductServices) => {
  return async (
    req: Request<RestockProductParams, {}, RestockProductBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
      const product = await productServices.restockProduct({ id, quantity });
      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  };
};
