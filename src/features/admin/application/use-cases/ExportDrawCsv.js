// Use Case Pattern:
// CU 1.1.2 D5: exporta el CSV del sorteo de una convocatoria como archivo
// adjunto (Content-Disposition: attachment). Solo ROLE_ADMIN.
//
// Dependency Inversion:
// Depende de la abstracción CallAdminRepository, no de HTTP.
export class ExportDrawCsv {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(callId) {
    return await this.callAdminRepository.exportDrawCsv(callId);
  }
}
