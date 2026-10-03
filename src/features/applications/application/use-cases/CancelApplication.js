// Use Case Pattern:
// Encapsulates application cancellation.
//
// Dependency Inversion:
// Depends on repository abstraction instead of HTTP infrastructure.
export class CancelApplication {
  constructor(applicationRepository) {
    // Dependency Injection:
    // Repository implementation is provided externally.
    this.applicationRepository = applicationRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error("Application id is required");
    }

    return await this.applicationRepository.cancel(id);
  }
}
