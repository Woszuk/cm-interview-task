import test, { describe, mock } from "node:test";
import assert from "node:assert";
import { createProductRepository } from "src/database/repositories/product-repository";
import { Product } from "src/models/products";
import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { createProductServices } from "src/services/products";

describe("sellProduct", () => {
  const productRepository = createProductRepository();
  const productService = createProductServices(productRepository);

  test("Should sell product", async () => {
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

    await productService.createProduct(productData);

    const mockSell = mock.method(productRepository, "sell", async (id: string) => ({
      id,
      ...productData,
      stock: productData.stock - 1,
    }));

    const product = await productService.sellProduct(id);

    assert.strictEqual(mockSell.mock.calls.length, 1);
    assert.equal(product?.stock, productData.stock - 1);
  });

  test("Should throw error if there is no product with entered id", async () => {
    const id = "123456";
    const mockSell = mock.method(productRepository, "sell", () => null);

    await assert.rejects(
      async () => {
        await productService.sellProduct(id);
      },
      err => {
        assert.strictEqual(mockSell.mock.calls.length, 1);
        assert.strictEqual(err instanceof EntityNotFoundError, true);
        return true;
      }
    );
  });

  test("Should throw error if product stock is 0", async () => {
    const id = "123456";
    mock.method(productRepository, "create", async (data: Partial<Product>) => ({
      _id: id,
      ...data,
    }));

    const productData = {
      name: "Spoon",
      description: "The best spoon in the world at an attractive price",
      price: 1.23,
      stock: 0,
    };

    const mockSell = mock.method(productRepository, "sell", async () => null);

    await productService.createProduct(productData);

    await assert.rejects(
      async () => {
        await productService.sellProduct(id);
      },
      err => {
        assert.strictEqual(mockSell.mock.calls.length, 1);
        assert.strictEqual(err instanceof EntityNotFoundError, true);
        return true;
      }
    );
  });
});
