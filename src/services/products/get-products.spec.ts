import test, { describe, mock } from "node:test";
import assert from "node:assert";
import { createProductRepository } from "src/database/repositories/product-repository";
import { Product } from "src/models/products";
import { createProductServices } from "src/services/products";

describe("getProducts", () => {
  const productRepository = createProductRepository();
  const productService = createProductServices(productRepository);

  test("Should get all products", async () => {
    const mockGetAll = mock.method(
      productRepository,
      "getAll",
      () =>
        [
          {
            name: "Spoon",
            description: "The best spoon in the world at an attractive price",
            price: 1.23,
            stock: 2,
          },
        ] as Product[]
    );

    const products = await productService.getProducts();

    assert.strictEqual(mockGetAll.mock.calls.length, 1);
    assert.equal(products.length, 1);
  });

  test("Should return an empty array if there are no products", async () => {
    const mockGetAll = mock.method(productRepository, "getAll", async () => []);

    const products = await productService.getProducts();

    assert.strictEqual(mockGetAll.mock.calls.length, 1);
    assert.equal(products.length, 0);
  });
});
