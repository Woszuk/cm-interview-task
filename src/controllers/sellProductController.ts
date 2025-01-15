import { NextFunction, Request, Response } from "express";
import { RestockProductParams } from "src/schemas/product";
import { ProductServices } from "src/services/products";

export const sellProductController = (productServices: ProductServices) => {
  return async (req: Request<RestockProductParams>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const product = await productServices.sellProduct(id);
      res.status(200).send(product);
    } catch (err) {
      next(err);
    }
  };
};
