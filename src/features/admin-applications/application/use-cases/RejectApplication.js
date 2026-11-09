export class RejectApplication {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(id, reason) {
    return this.repository.reject(id, reason);
  }
}
