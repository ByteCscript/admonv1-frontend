// Domain Entity:
// Represents the authenticated user session.
//
// Roles let the presentation layer gate routes by role (e.g. ROLE_ADMIN).
// userId / apartmentNumber / towerName describe the logged resident
// (null for users without apartment, e.g. the administration).
export class AuthSession {
  constructor({
    token,
    type,
    expiresIn,
    email,
    name,
    roles,
    userId,
    apartmentNumber,
    towerName,
  }) {
    this.token = token;
    this.type = type;
    this.expiresIn = expiresIn;
    this.email = email ?? null;
    this.name = name ?? null;
    this.roles = Array.isArray(roles) ? roles : [];
    this.userId = userId ?? null;
    this.apartmentNumber = apartmentNumber ?? null;
    this.towerName = towerName ?? null;
  }

  // Presentation helper: "Apto 101, Torre 1" or null when unknown.
  get apartmentLabel() {
    if (!this.apartmentNumber) {
      return null;
    }

    return this.towerName
      ? `Apto ${this.apartmentNumber}, ${this.towerName}`
      : `Apto ${this.apartmentNumber}`;
  }

  // Up to two initials from the user's name (avatar).
  get initials() {
    const parts = (this.name || "").trim().split(/\s+/).filter(Boolean);

    return parts
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }
}
