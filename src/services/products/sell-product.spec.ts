import test, { describe, mock } from "node:test";
import assert from "node:assert";
import { createProductRepository } from "src/database/repositories/product-repository";
import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { createProductServices } from "src/services/products";
import { StockInsufficientError } from "src/errors/StockInsufficientError";

describe("sellProduct", () => {
  const productRepository = createProductRepository();
  const productService = createProductServices(productRepository);

  test("Should sell product", async () => {
    const mockFindById = mock.method(productRepository, "findById", async () => spoon);

    const mockSell = mock.method(productRepository, "sell", async (id: string) => ({
      id,
      ...spoon,
      stock: spoon.stock - 1,
    }));

    const product = await productService.sellProduct({ id: spoon._id, quantity: 1 });

    assert.strictEqual(mockSell.mock.calls.length, 1);
    assert.strictEqual(mockFindById.mock.calls.length, 1);
    assert.equal(product?.stock, spoon.stock - 1);
  });

  test("Should throw error if there is no product with entered id", async () => {
    const mockFindById = mock.method(productRepository, "findById", async () => null);
    const mockSell = mock.method(productRepository, "sell", () => null);

    await assert.rejects(
      async () => {
        await productService.sellProduct({ id: spoon._id, quantity: 1 });
      },
      err => {
        assert.strictEqual(mockFindById.mock.calls.length, 1);
        assert.strictEqual(mockSell.mock.calls.length, 0);
        assert.strictEqual(err instanceof EntityNotFoundError, true);
        return true;
      }
    );
  });

  test("Should throw error if product stock is less than quantity of sell", async () => {
    mock.method(productRepository, "findById", async () => spoon);

    const mockSell = mock.method(productRepository, "sell", async () => null);

    await assert.rejects(
      async () => {
        await productService.sellProduct({ id: spoon._id, quantity: 3 });
      },
      err => {
        assert.strictEqual(mockSell.mock.calls.length, 1);
        assert.strictEqual(err instanceof StockInsufficientError, true);
        return true;
      }
    );
  });
});

const spoon = {
  _id: "123456",
  name: "Spoon",
  description: "The best spoon in the world at an attractive price",
  price: 1.23,
  stock: 2,
};
