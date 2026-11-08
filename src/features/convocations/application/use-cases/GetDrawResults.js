// Use Case Pattern:
// CU 1.1.2 D4: carga el listado de resultados del sorteo de una convocatoria
// para el residente autenticado (nombre, apartamento, torre, resultado,
// estado, posición) junto con la huella de integridad del CSV (D3).
//
// Dependency Inversion:
// Depende de la abstracción DrawRepository, no de HTTP.
export class GetDrawResults {
  constructor(drawRepository) {
    this.drawRepository = drawRepository;
  }

  async execute(callId) {
    return await this.drawRepository.getDrawResults(callId);
  }
}
