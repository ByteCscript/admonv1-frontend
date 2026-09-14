import { ConvocationRepository } from "../../domain/repositories/ConvocationRepository";
import { fetchConvocations } from "../api/convocations.api";

// Adapter Pattern:
// Adapta la infraestructura HTTP al contrato definido por el dominio.
//
// Repository Pattern:
// Implementa el repositorio concreto para obtener datos vía API REST.
export class HttpConvocationRepository extends ConvocationRepository {
  async getAll() {
    return await fetchConvocations();
  }
}
