// Use Case Pattern:
// Encapsulates the document upload operation.
export class UploadDocument {
  constructor(documentRepository) {
    // Dependency Injection:
    // Receives the repository implementation externally.
    this.documentRepository = documentRepository;
  }

  async execute(file, onProgress) {
    if (!file) {
      throw new Error("Document is required");
    }

    return await this.documentRepository.upload(file, onProgress);
  }
}
