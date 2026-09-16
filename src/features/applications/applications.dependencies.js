import { GetApplications } from "./application/use-cases/GetApplications";
import { CreateApplication } from "./application/use-cases/CreateApplication";
import { UploadDocument } from "./application/use-cases/UploadDocument";

import { HttpApplicationRepository } from "./infrastructure/repositories/HttpApplicationRepository";
import { HttpDocumentRepository } from "./infrastructure/repositories/HttpDocumentRepository";

// Composition Root:
// Centralizes dependency construction and wiring.
const applicationRepository = new HttpApplicationRepository();

const documentRepository = new HttpDocumentRepository();

// Dependency Injection:
// Injects concrete repositories into application use cases.
export const createApplicationUseCase = new CreateApplication(
  applicationRepository,
);

export const uploadDocumentUseCase = new UploadDocument(documentRepository);

export const getApplicationsUseCase = new GetApplications(
  applicationRepository,
);
