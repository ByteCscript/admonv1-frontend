export class GetAdminApplications {
  constructor(repository) {
    this.repository = repository;
  }
  async execute({ callId, status, page = 0, size = 50 } = {}) {
    return this.repository.getAll({ callId, status, page, size });
  }
}
