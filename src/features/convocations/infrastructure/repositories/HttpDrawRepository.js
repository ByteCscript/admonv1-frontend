import { DrawRepository } from "../../domain/repositories/DrawRepository";
import {
  fetchResidentDrawResults,
  fetchResidentDrawHash,
} from "../api/convocations.api";

// Adapter Pattern:
// Conecta el gateway HTTP con el contrato de dominio del sorteo.
export class HttpDrawRepository extends DrawRepository {
  async getDrawResults(callId) {
    return await fetchResidentDrawResults(callId);
  }

  async getDrawHash(callId) {
    return await fetchResidentDrawHash(callId);
  }
}
