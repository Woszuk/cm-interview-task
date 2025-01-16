export class EntityNotFoundError extends Error {
  details: { ids: string[] };

  constructor(message: string, details: { ids: string[] }) {
    super(message);
    this.name = "EntityNotFoundError";
    this.details = details;
  }
}
