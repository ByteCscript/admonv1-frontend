// Repository Pattern:
// Defines the domain contract for application persistence.
export class ApplicationRepository {
  async create(application) {
    throw new Error("Method create() not implemented");
  }

  async uploadDocument(file, onProgress) {
    throw new Error("Method uploadDocument() not implemented");
  }

  async getAll() {
    throw new Error("Method getAll() not implemented");
  }

  async getById() {
    throw new Error("Method getById() not implemented");
  }
}
