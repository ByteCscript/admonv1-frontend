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
      email: data.email,
      name: data.name,
      roles: data.roles,
    });

    // Storage Adapter:
    // Persists the authenticated session (token + profile + roles).
    this.tokenStorage.save({
      token: session.token,
      type: session.type,
      expiresIn: session.expiresIn,
      email: session.email,
      name: session.name,
      roles: session.roles,
    });

    return session;
  }

  logout() {
    this.tokenStorage.remove();
  }

  getToken() {
    return this.tokenStorage.get();
  }

  getSession() {
    const stored = this.tokenStorage.getSession();

    if (!stored) {
      return null;
    }

    return new AuthSession({
      token: stored.token,
      type: stored.type,
      expiresIn: stored.expiresIn,
      email: stored.email,
      name: stored.name,
      roles: stored.roles,
    });
  }
}
