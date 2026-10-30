// Use Case Pattern:
// Replaces a call entirely (PUT, decision D-b).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class UpdateCall {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(id, payload) {
    return await this.callAdminRepository.update(id, payload);
  }
}
