import { GetConvocations } from "./application/use-cases/GetConvocations";
import { GetConvocationById } from "./application/use-cases/GetConvocationById";
import { HttpConvocationRepository } from "./infrastructure/repositories/HttpConvocationRepository";

// Composition Root:
// Centralizes the creation and connection of dependencies.
//
// Dependency Injection:
// Injects the concrete implementation of the repository into the use case.
const convocationRepository = new HttpConvocationRepository();

export const getConvocationsUseCase = new GetConvocations(
  convocationRepository,
);

export const getConvocationByIdUseCase = new GetConvocationById(
  convocationRepository,
);
