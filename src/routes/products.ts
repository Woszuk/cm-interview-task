import { Router } from "express";
import { createProductController } from "src/controllers/create-product";
import { getProductsController } from "src/controllers/get-products";
import { createProductRepository } from "src/database/repositories/product-repository";
import { validationMiddleware } from "src/middlewares/validation-middleware";
import { createProductSchema } from "src/schemas/product";
import { createProductServices } from "src/services/products";

export const productsRouter = (router: Router) => {
  const productRepository = createProductRepository();
  const productServices = createProductServices(productRepository);

  router.get("/", getProductsController(productServices));

  router.post(
    "/",
    validationMiddleware({ schema: createProductSchema }),
    createProductController(productServices)
  );

  return router;
};
