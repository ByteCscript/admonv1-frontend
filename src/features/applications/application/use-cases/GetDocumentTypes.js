// Use Case Pattern:
// Encapsulates retrieval of the required-document catalog.
export class GetDocumentTypes {
  constructor(documentRepository) {
    // Dependency Injection:
    // Receives the repository implementation externally.
    this.documentRepository = documentRepository;
  }

  async execute() {
    return await this.documentRepository.getTypes();
  }
}
