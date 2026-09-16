import { ApplicationRepository } from "../../domain/repositories/ApplicationRepository";
import {
  createApplicationRequest,
  fetchApplications,
} from "../api/applications.api";

// Adapter Pattern:
// Adapts REST infrastructure to the domain repository contract.
//
// Repository Pattern:
// Implements application persistence through HTTP.
export class HttpApplicationRepository extends ApplicationRepository {
  async create(application) {
    return await createApplicationRequest(application);
  }

  async getAll(filters) {
    return await fetchApplications(filters);
  }
}
