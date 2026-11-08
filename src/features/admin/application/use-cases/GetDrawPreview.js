// Use Case Pattern:
// Loads the pre-draw summary of a call (C.U-08, step 2 and FA-01).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class GetDrawPreview {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(id) {
    return await this.callAdminRepository.getDrawPreview(id);
  }
}
