// Use Case Pattern:
// CU 1.1.2 D4: carga la huella de integridad (SHA-256) del CSV exportado del
// sorteo de una convocatoria para el residente autenticado.
//
// Dependency Inversion:
// Depende de la abstracción DrawRepository, no de HTTP.
export class GetDrawHash {
  constructor(drawRepository) {
    this.drawRepository = drawRepository;
  }

  async execute(callId) {
    return await this.drawRepository.getDrawHash(callId);
  }
}
