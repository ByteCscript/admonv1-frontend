import { HttpAdminApplicationRepository } from "./infrastructure/repositories/HttpAdminApplicationRepository.js";
import { GetAdminApplications } from "./application/use-cases/GetAdminApplications.js";
import { GetAdminApplicationDetail } from "./application/use-cases/GetAdminApplicationDetail.js";
import { AcceptApplication } from "./application/use-cases/AcceptApplication.js";
import { RejectApplication } from "./application/use-cases/RejectApplication.js";
import { GetDocumentReadUrl } from "./application/use-cases/GetDocumentReadUrl.js";

const repo = new HttpAdminApplicationRepository();

export const getAdminApplicationsUseCase = new GetAdminApplications(repo);
export const getAdminApplicationDetailUseCase = new GetAdminApplicationDetail(repo);
export const acceptApplicationUseCase = new AcceptApplication(repo);
export const rejectApplicationUseCase = new RejectApplication(repo);
export const getDocumentReadUrlUseCase = new GetDocumentReadUrl(repo);
