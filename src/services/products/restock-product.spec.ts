import test, { describe, mock } from "node:test";
import assert from "node:assert";
import { createProductRepository } from "src/database/repositories/product-repository";
import { Product } from "src/models/product";
import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { createProductServices } from "src/services/products";

describe("restockProduct", () => {
  const productRepository = createProductRepository();
  const productService = createProductServices(productRepository);

  test("Should restock product", async () => {
    const id = "123456";
    mock.method(productRepository, "create", async (data: Partial<Product>) => ({
      _id: id,
      ...data,
    }));

    const productData = {
      name: "Spoon",
      description: "The best spoon in the world at an attractive price",
      price: 1.23,
      stock: 2,
    };
    await productRepository.create(productData);

    const mockRestock = mock.method(productRepository, "restock", async (id: string) => ({
      id,
      ...productData,
      stock: productData.stock + 1,
    }));

    const product = await productService.restockProduct({ id, quantity: 1 });

    assert.strictEqual(mockRestock.mock.calls.length, 1);
    assert.equal(product?.stock, productData.stock + 1);
  });

  test("Should throw error if there is no product with entered id", async () => {
    const id = "123456";
    const mockRestock = mock.method(productRepository, "restock", () => null);

    await assert.rejects(
      async () => {
        await productService.restockProduct({ id, quantity: 1 });
      },
      err => {
        assert.strictEqual(mockRestock.mock.calls.length, 1);
        assert.strictEqual(err instanceof EntityNotFoundError, true);
        return true;
      }
    );
  });
});
