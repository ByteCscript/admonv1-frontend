// Repository Pattern:
// Defines the domain data access contract for call administration (RN-06).
//
// Decouples the administration use cases from the HTTP transport.
export class CallAdminRepository {
  async getAll() {
    throw new Error("Method getAll() not implemented");
  }

  async create() {
    throw new Error("Method create() not implemented");
  }

  async update() {
    throw new Error("Method update() not implemented");
  }

  async close() {
    throw new Error("Method close() not implemented");
  }

  async reopen() {
    throw new Error("Method reopen() not implemented");
  }

  async remove() {
    throw new Error("Method remove() not implemented");
  }

  // C.U-08 · Ejecutar sorteo de cupos.
  async getDrawPreview() {
    throw new Error("Method getDrawPreview() not implemented");
  }

  async executeDraw() {
    throw new Error("Method executeDraw() not implemented");
  }

  async getDrawResult() {
    throw new Error("Method getDrawResult() not implemented");
  }

  // CU 1.1.2 · Resultados del sorteo (D4) y huella de integridad (D3).
  async getDrawResults() {
    throw new Error("Method getDrawResults() not implemented");
  }

  async getDrawHash() {
    throw new Error("Method getDrawHash() not implemented");
  }

  // CU 1.1.2 · Exportar CSV del sorteo (D5).
  async exportDrawCsv() {
    throw new Error("Method exportDrawCsv() not implemented");
  }
}
