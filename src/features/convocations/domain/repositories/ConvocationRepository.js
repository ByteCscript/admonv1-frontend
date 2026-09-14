// Repository Pattern:
// Defines the domain data access contract.
// Decouples business logic from the persistence source.
export class ConvocationRepository {
  async getAll() {
    throw new Error("Method getAll() not implemented");
  }

  async getById(id) {
    throw new Error("Method getById() not implemented");
  }
}
