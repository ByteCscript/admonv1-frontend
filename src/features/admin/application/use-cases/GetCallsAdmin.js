// Use Case Pattern:
// Lists every call for the administration screens.
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class GetCallsAdmin {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute() {
    return await this.callAdminRepository.getAll();
  }
}
