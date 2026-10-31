// Use Case Pattern:
// Deletes a call only when it has no applications (RN-08, 409 from backend).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class DeleteCall {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(id) {
    return await this.callAdminRepository.remove(id);
  }
}
