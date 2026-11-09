// Use Case Pattern:
// CU 1.1.2 D4: carga la huella de integridad (SHA-256) del CSV exportado del
// sorteo de una convocatoria. Accesible para residentes y administradores.
//
// Dependency Inversion:
// Depende de la abstracción CallAdminRepository, no de HTTP.
export class GetDrawHash {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(callId) {
    return await this.callAdminRepository.getDrawHash(callId);
  }
}
