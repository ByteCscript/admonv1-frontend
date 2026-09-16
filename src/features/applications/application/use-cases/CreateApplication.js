// Use Case Pattern:
// Encapsulates the application registration operation.
//
// Dependency Inversion:
// Depends on repository abstraction instead of HTTP infrastructure.
export class CreateApplication {
  constructor(applicationRepository) {
    // Dependency Injection:
    // Repository implementation is provided externally.
    this.applicationRepository = applicationRepository;
  }

  async execute({ convocationId, residentId, documentIds }) {
    return await this.applicationRepository.create({
      convocationId,
      residentId,
      documentIds,
    });
  }
}
