import express from "express";
import { productsRouter } from "src/routes/products";

export const createServer = () => {
  const server = express();
  const router = express.Router();

  server.use(express.json());

  server.use("/products", productsRouter(router));

  return server;
};
