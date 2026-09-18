import { Login } from "./application/use-cases/Login";

import { HttpAuthRepository } from "./infrastructure/repositories/HttpAuthRepository";
import { TokenStorage } from "./infrastructure/storage/TokenStorage";

// Composition Root:
// Centralizes authentication dependency construction.
const tokenStorage = new TokenStorage();

const authRepository = new HttpAuthRepository(tokenStorage);

// Dependency Injection:
// Injects authentication repository into use cases.
export const loginUseCase = new Login(authRepository);

// Infrastructure dependency:
// Exposes authentication services required by the HTTP layer.
export { authRepository };
