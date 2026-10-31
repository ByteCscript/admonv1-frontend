// Use Case Pattern:
// Reopens a manually closed call (RN-08).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class ReopenCall {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(id) {
    return await this.callAdminRepository.reopen(id);
  }
}
