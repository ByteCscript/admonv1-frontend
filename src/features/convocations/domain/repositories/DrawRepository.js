// Repository Pattern:
// Define el contrato de acceso a datos del sorteo de cupos para residentes.
//
// Decouples la lógica de negocio del transporte HTTP.
export class DrawRepository {
  async getDrawResults() {
    throw new Error("Method getDrawResults() not implemented");
  }

  async getDrawHash() {
    throw new Error("Method getDrawHash() not implemented");
  }
}
