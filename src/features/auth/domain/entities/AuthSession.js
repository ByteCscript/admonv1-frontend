// Domain Entity:
// Represents the authenticated user session.
//
// Roles let the presentation layer gate routes by role (e.g. ROLE_ADMIN).
export class AuthSession {
  constructor({ token, type, expiresIn, email, name, roles }) {
    this.token = token;
    this.type = type;
    this.expiresIn = expiresIn;
    this.email = email ?? null;
    this.name = name ?? null;
    this.roles = Array.isArray(roles) ? roles : [];
  }
}
