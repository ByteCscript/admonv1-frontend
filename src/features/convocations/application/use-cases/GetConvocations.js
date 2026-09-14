// Use Case Pattern:
// It encapsulates a specific application operation.
//
// Dependency Inversion Principle:
// It depends on a repository abstraction, not on a concrete HTTP implementation.
export class GetConvocations {
  constructor(convocationRepository) {
    // Dependency Injection:
    // The dependency is received externally instead of being instantiated here.
    this.convocationRepository = convocationRepository;
  }

  async execute() {
    return await this.convocationRepository.getAll();
  }
}
