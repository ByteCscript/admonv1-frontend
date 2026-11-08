import { GetCallsAdmin } from "./application/use-cases/GetCallsAdmin";
import { CreateCall } from "./application/use-cases/CreateCall";
import { UpdateCall } from "./application/use-cases/UpdateCall";
import { CloseCall } from "./application/use-cases/CloseCall";
import { ReopenCall } from "./application/use-cases/ReopenCall";
import { DeleteCall } from "./application/use-cases/DeleteCall";
import { GetDrawPreview } from "./application/use-cases/GetDrawPreview";
import { ExecuteDraw } from "./application/use-cases/ExecuteDraw";
import { GetDrawResult } from "./application/use-cases/GetDrawResult";
import { GetDrawResults } from "./application/use-cases/GetDrawResults";
import { GetDrawHash } from "./application/use-cases/GetDrawHash";
import { ExportDrawCsv } from "./application/use-cases/ExportDrawCsv";

import { HttpCallAdminRepository } from "./infrastructure/repositories/HttpCallAdminRepository";

// Composition Root:
// Centralizes the creation and connection of administration dependencies.
//
// This is the only place where the concrete HTTP repository is instantiated.
const callAdminRepository = new HttpCallAdminRepository();

export const getCallsAdminUseCase = new GetCallsAdmin(callAdminRepository);

export const createCallUseCase = new CreateCall(callAdminRepository);

export const updateCallUseCase = new UpdateCall(callAdminRepository);

export const closeCallUseCase = new CloseCall(callAdminRepository);

export const reopenCallUseCase = new ReopenCall(callAdminRepository);

export const deleteCallUseCase = new DeleteCall(callAdminRepository);

// C.U-08 · Ejecutar sorteo de cupos.
export const getDrawPreviewUseCase = new GetDrawPreview(callAdminRepository);

export const executeDrawUseCase = new ExecuteDraw(callAdminRepository);

export const getDrawResultUseCase = new GetDrawResult(callAdminRepository);

// CU 1.1.2 D4 · Resultados y huella de integridad del sorteo.
export const getDrawResultsUseCase = new GetDrawResults(callAdminRepository);

export const getDrawHashUseCase = new GetDrawHash(callAdminRepository);

// CU 1.1.2 D5 · Exportar CSV del sorteo (solo ROLE_ADMIN).
export const exportDrawCsvUseCase = new ExportDrawCsv(callAdminRepository);
