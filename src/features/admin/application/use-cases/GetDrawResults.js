// Use Case Pattern:
// CU 1.1.2 D4: carga el listado de resultados del sorteo de una convocatoria
// (nombre, apartamento, torre, resultado, estado, posición) junto con la
// huella de integridad del CSV (D3). Accesible para residentes y administradores.
//
// Dependency Inversion:
// Depende de la abstracción CallAdminRepository, no de HTTP.
export class GetDrawResults {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(callId) {
    return await this.callAdminRepository.getDrawResults(callId);
  }
}
