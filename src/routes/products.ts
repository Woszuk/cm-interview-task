import { Router } from "express";
import { getProductsController } from "src/controllers/get-products";

export const productsRouter = (router: Router) => {
  router.get("/", getProductsController);

  return router;
};
