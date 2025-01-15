import { Router } from "express";
import { createProductController } from "src/controllers/create-product";
import { getProductsController } from "src/controllers/get-products";
import { restockProductController } from "src/controllers/restock-product-controller";
import { sellProductController } from "src/controllers/sellProductController";
import { createProductRepository } from "src/database/repositories/product-repository";
import { validationMiddleware } from "src/middlewares/validation-middleware";
import { createProductSchema, restockProductSchema, sellProductSchema } from "src/schemas/product";
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

  router.post(
    "/:id/restock",
    validationMiddleware({ schema: restockProductSchema, location: "params" }),
    restockProductController(productServices)
  );

  router.post(
    "/:id/sell",
    validationMiddleware({ schema: sellProductSchema, location: "params" }),
    sellProductController(productServices)
  );
  return router;
};
