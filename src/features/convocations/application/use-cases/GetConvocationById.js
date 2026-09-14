// Use Case Pattern:
// Encapsulates retrieval of a single convocation.
//
// Dependency Inversion:
// Depends on repository abstraction, not HTTP details.
export class GetConvocationById {
  constructor(convocationRepository) {
    // Dependency Injection:
    // Repository dependency is provided externally.
    this.convocationRepository = convocationRepository;
  }

  async execute(id) {
    return await this.convocationRepository.getById(id);
  }
}
