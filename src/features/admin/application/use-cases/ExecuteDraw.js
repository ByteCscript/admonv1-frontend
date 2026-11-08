// Use Case Pattern:
// Executes the slot draw of a closed call (C.U-08, steps 6-11).
// The draw is final and cannot be repeated (RN-19).
//
// Dependency Inversion:
// Depends on the CallAdminRepository abstraction, not on HTTP.
export class ExecuteDraw {
  constructor(callAdminRepository) {
    this.callAdminRepository = callAdminRepository;
  }

  async execute(id) {
    return await this.callAdminRepository.executeDraw(id);
  }
}
