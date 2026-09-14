// Repository Pattern:
// Define el contrato de acceso a datos del dominio.
// Desacopla la lógica de negocio de la fuente de persistencia.
export class ConvocationRepository {
  async getAll() {
    throw new Error("Method getAll() not implemented");
  }

  async getById(id) {
    throw new Error("Method getById() not implemented");
  }
}
