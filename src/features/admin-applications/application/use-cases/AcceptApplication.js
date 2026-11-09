export class AcceptApplication {
  constructor(repository) {
    this.repository = repository;
  }
  async execute(id) {
    return this.repository.accept(id);
  }
}
