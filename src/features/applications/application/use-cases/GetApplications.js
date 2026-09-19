// Use Case Pattern:
// Encapsulates application listing retrieval.
//
// Dependency Inversion:
// Depends on repository abstraction instead of HTTP infrastructure.
export class GetApplications {
  constructor(applicationRepository) {
    // Dependency Injection:
    // Repository implementation is provided externally.
    this.applicationRepository = applicationRepository;
  }

  async execute({ residentId, page = 0, size = 10 } = {}) {
    return await this.applicationRepository.getAll({
      residentId,
      page,
      size,
    });
  }
}
