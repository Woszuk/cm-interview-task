import test, { describe, mock } from "node:test";
import assert from "node:assert";
import { createProductRepository } from "src/database/repositories/product-repository";
import { Product } from "src/models/products";
import { createProductServices } from "src/services/products";

describe("createProduct", () => {
  const productRepository = createProductRepository();
  const productService = createProductServices(productRepository);

  test("Should create product", async () => {
    const mockCreate = mock.method(productRepository, "create", (data: Partial<Product>) => ({
      _id: "123456",
      ...data,
    }));

    const productData = {
      name: "Spoon",
      description: "The best spoon in the world at an attractive price",
      price: 1.23,
      stock: 2,
    };

    const product = await productService.createProduct(productData);

    assert.strictEqual(mockCreate.mock.calls.length, 1);
    assert.equal(product.name, productData.name);
  });
});
