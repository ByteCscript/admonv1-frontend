import { GetConvocations } from "./application/use-cases/GetConvocations";
import { HttpConvocationRepository } from "./infrastructure/repositories/HttpConvocationRepository";

// Composition Root:
// Centraliza la creación y conexión de dependencias.
//
// Dependency Injection:
// Inyecta la implementación concreta del repositorio
// dentro del caso de uso.
const convocationRepository = new HttpConvocationRepository();

export const getConvocationsUseCase = new GetConvocations(
  convocationRepository,
);
