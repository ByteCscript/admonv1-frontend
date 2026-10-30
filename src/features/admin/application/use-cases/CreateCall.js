// Use Case Pattern:
// Creates a call (RN-07 validation is enforced by the backend).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class CreateCall {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(payload) {
    return await this.callAdminRepository.create(payload);
  }
}
