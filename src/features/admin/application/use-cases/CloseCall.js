// Use Case Pattern:
// Closes a call manually (RN-08).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class CloseCall {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(id) {
    return await this.callAdminRepository.close(id);
  }
}
