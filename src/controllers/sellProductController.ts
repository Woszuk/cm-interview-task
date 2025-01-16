import { NextFunction, Request, Response } from "express";
import { SellProductBody, SellProductParams } from "src/schemas/product";
import { ProductServices } from "src/services/products";

export const sellProductController = (productServices: ProductServices) => {
  return async (
    req: Request<SellProductParams, {}, SellProductBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
      const product = await productServices.sellProduct({ id, quantity });
      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  };
};
