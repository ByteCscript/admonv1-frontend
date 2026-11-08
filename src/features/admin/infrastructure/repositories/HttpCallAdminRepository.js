import { CallAdminRepository } from "../../domain/repositories/CallAdminRepository";
import {
  fetchAdminCalls,
  createCallRequest,
  updateCallRequest,
  closeCallRequest,
  reopenCallRequest,
  deleteCallRequest,
  fetchDrawPreview,
  executeDrawRequest,
  fetchDrawResult,
} from "../api/adminCalls.api";

// Adapter Pattern:
// Connects the administration HTTP gateway to the domain contract.
export class HttpCallAdminRepository extends CallAdminRepository {
  async getAll() {
    return await fetchAdminCalls();
  }

  async create(payload) {
    return await createCallRequest(payload);
  }

  async update(id, payload) {
    return await updateCallRequest(id, payload);
  }

  async close(id) {
    return await closeCallRequest(id);
  }

  async reopen(id) {
    return await reopenCallRequest(id);
  }

  async remove(id) {
    return await deleteCallRequest(id);
  }

  async getDrawPreview(id) {
    return await fetchDrawPreview(id);
  }

  async executeDraw(id) {
    return await executeDrawRequest(id);
  }

  async getDrawResult(id) {
    return await fetchDrawResult(id);
  }
}
