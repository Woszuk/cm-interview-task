import { Router } from "express";
import { createProductController } from "src/controllers/create-product";
import { getProductsController } from "src/controllers/get-products";
import { validationMiddleware } from "src/middlewares/validation-middleware";
import { createProductSchema } from "src/schemas/product";

export const productsRouter = (router: Router) => {
  router.get("/", getProductsController);

  router.post("/", validationMiddleware(createProductSchema), createProductController);

  return router;
};
