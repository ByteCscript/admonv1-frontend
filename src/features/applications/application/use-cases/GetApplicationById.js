// Use Case Pattern:
// Encapsulates application detail retrieval.
//
// Dependency Inversion:
// Depends on repository abstraction instead of HTTP infrastructure.
export class GetApplicationById {
  constructor(applicationRepository) {
    // Dependency Injection:
    // Repository implementation is provided externally.
    this.applicationRepository = applicationRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error("Application id is required");
    }

    return await this.applicationRepository.getById(id);
  }
}
