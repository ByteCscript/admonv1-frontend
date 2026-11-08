export class GetDocumentReadUrl {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(applicationId, documentId) {
    return this.repository.getDocumentReadUrl(applicationId, documentId);
  }
}
