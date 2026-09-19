import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { AuthSession } from "../../domain/entities/AuthSession";
import { loginRequest } from "../api/auth.api";

// Adapter Pattern:
// Adapts authentication infrastructure to the domain contract.
export class HttpAuthRepository extends AuthRepository {
  constructor(tokenStorage) {
    super();
    this.tokenStorage = tokenStorage;
  }

  async login(credentials) {
    const data = await loginRequest(credentials);

    const session = new AuthSession({
      token: data.token,
      type: data.type,
      expiresIn: data.expiresIn,
    });

    // Storage Adapter:
    // Persists the authenticated session token.
    this.tokenStorage.save(session.token);

    return session;
  }

  logout() {
    this.tokenStorage.remove();
  }

  getToken() {
    return this.tokenStorage.get();
  }
}
