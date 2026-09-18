// Domain Entity:
// Represents the authenticated user session.
export class AuthSession {
  constructor({ token, type, expiresIn }) {
    this.token = token;
    this.type = type;
    this.expiresIn = expiresIn;
  }
}
