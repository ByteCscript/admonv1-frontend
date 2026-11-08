import {
  getAdminApplicationsApi,
  getAdminApplicationDetailApi,
  acceptAdminApplicationApi,
  rejectAdminApplicationApi,
  getDocumentReadUrlApi,
} from "../api/adminApplications.api.js";

export class HttpAdminApplicationRepository {
  async getAll({ callId, status, page = 0, size = 50 } = {}) {
    return getAdminApplicationsApi({ callId, status, page, size });
  }
  async getById(id) {
    return getAdminApplicationDetailApi(id);
  }
  async accept(id) {
    return acceptAdminApplicationApi(id);
  }
  async reject(id, reason) {
    return rejectAdminApplicationApi(id, reason);
  }
  async getDocumentReadUrl(applicationId, documentId) {
    return getDocumentReadUrlApi(applicationId, documentId);
  }
}
