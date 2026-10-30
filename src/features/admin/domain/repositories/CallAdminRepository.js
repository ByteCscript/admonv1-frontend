// Repository Pattern:
// Defines the domain data access contract for call administration (RN-06).
//
// Decouples the administration use cases from the HTTP transport.
export class CallAdminRepository {
  async getAll() {
    throw new Error("Method getAll() not implemented");
  }

  async create() {
    throw new Error("Method create() not implemented");
  }

  async update() {
    throw new Error("Method update() not implemented");
  }

  async close() {
    throw new Error("Method close() not implemented");
  }

  async reopen() {
    throw new Error("Method reopen() not implemented");
  }

  async remove() {
    throw new Error("Method remove() not implemented");
  }
}
