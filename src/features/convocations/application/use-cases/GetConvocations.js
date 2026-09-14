// Use Case Pattern:
// Encapsula una operación específica de la aplicación.
//
// Dependency Inversion Principle:
// Depende de una abstracción de repositorio, no de una implementación HTTP concreta.
export class GetConvocations {
  constructor(convocationRepository) {
    // Dependency Injection:
    // La dependencia se recibe externamente en lugar de instanciarse aquí.
    this.convocationRepository = convocationRepository;
  }

  async execute() {
    return await this.convocationRepository.getAll();
  }
}
