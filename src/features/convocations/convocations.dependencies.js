import { GetConvocations } from "./application/use-cases/GetConvocations";
import { GetConvocationById } from "./application/use-cases/GetConvocationById";
import { GetDrawResults } from "./application/use-cases/GetDrawResults";
import { GetDrawHash } from "./application/use-cases/GetDrawHash";
import { HttpConvocationRepository } from "./infrastructure/repositories/HttpConvocationRepository";
import { HttpDrawRepository } from "./infrastructure/repositories/HttpDrawRepository";

// Composition Root:
// Centralizes the creation and connection of dependencies.
//
// Dependency Injection:
// Injects the concrete implementation of the repository into the use case.
const convocationRepository = new HttpConvocationRepository();

const drawRepository = new HttpDrawRepository();

export const getConvocationsUseCase = new GetConvocations(
  convocationRepository,
);

export const getConvocationByIdUseCase = new GetConvocationById(
  convocationRepository,
);

// CU 1.1.2 D4 · Resultados y huella de integridad del sorteo (residente).
export const getResidentDrawResultsUseCase = new GetDrawResults(
  drawRepository,
);

export const getResidentDrawHashUseCase = new GetDrawHash(drawRepository);
