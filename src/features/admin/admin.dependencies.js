import { GetCallsAdmin } from "./application/use-cases/GetCallsAdmin";
import { CreateCall } from "./application/use-cases/CreateCall";
import { UpdateCall } from "./application/use-cases/UpdateCall";
import { CloseCall } from "./application/use-cases/CloseCall";
import { ReopenCall } from "./application/use-cases/ReopenCall";
import { DeleteCall } from "./application/use-cases/DeleteCall";

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
