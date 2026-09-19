// Repository Pattern:
// Defines the domain contract for document persistence.
export class DocumentRepository {
  async upload(documentType, file, onProgress) {
    throw new Error("Method upload() not implemented");
  }

  async getTypes() {
    throw new Error("Method getTypes() not implemented");
  }
}
