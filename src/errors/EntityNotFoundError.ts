export class EntityNotFoundError extends Error {
  details: { id: string };

  constructor(message: string, details: { id: string }) {
    super(message);
    this.name = "EntityNotFoundError";
    this.details = details;
  }
}
