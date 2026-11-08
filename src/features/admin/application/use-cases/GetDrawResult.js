// Use Case Pattern:
// Loads the result and audit record of an executed draw
// (C.U-08, step 13 and FA-03; RN-20 and RN-21).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class GetDrawResult {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(id) {
    return await this.callAdminRepository.getDrawResult(id);
  }
}
