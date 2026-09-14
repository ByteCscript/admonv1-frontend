import { ConvocationRepository } from "../../domain/repositories/ConvocationRepository";
import {
  fetchConvocations,
  fetchConvocationById,
} from "../api/convocations.api";
// Adapter Pattern:
// Adapts the HTTP infrastructure to the contract defined by the domain.
//
// Repository Pattern:
// Implement the concrete repository to retrieve data via the REST API.
export class HttpConvocationRepository extends ConvocationRepository {
  async getAll() {
    return await fetchConvocations();
  }

  async getById(id) {
    return await fetchConvocationById(id);
  }
}
