// Use Case Pattern:
// Encapsulates the document upload operation.
export class UploadDocument {
  constructor(documentRepository) {
    // Dependency Injection:
    // Receives the repository implementation externally.
    this.documentRepository = documentRepository;
  }

  async execute(documentType, file, onProgress) {
    if (!file) {
      throw new Error("Document is required");
    }

    if (!documentType) {
      throw new Error("Document type is required");
    }

    return await this.documentRepository.upload(documentType, file, onProgress);
  }
}
