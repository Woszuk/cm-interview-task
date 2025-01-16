export class StockInsufficientError extends Error {
  details: { stock: number; quantity: number; id: string };
  constructor(message: string, details: { stock: number; quantity: number; id: string }) {
    super(message);
    this.name = "StockInsufficientError";
    this.details = details;
  }
}
