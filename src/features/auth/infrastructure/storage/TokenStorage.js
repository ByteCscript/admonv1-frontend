const SESSION_KEY = "auth_session";
const LEGACY_TOKEN_KEY = "auth_token";

// Storage Adapter:
// Centralizes authenticated session persistence (JWT + profile + roles).
//
// The whole session is stored as JSON under SESSION_KEY; get() keeps
// returning only the token so existing callers do not change.
export class TokenStorage {
  save(session) {
    const payload =
      typeof session === "string"
        ? { token: session }
        : { ...session, token: session?.token ?? null };

    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));

    // Clears the previous single-token key so no stale session remains.
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  }

  get() {
    const session = this.getSession();

    return session ? session.token : null;
  }

  getSession() {
    const raw = localStorage.getItem(SESSION_KEY);

    if (!raw) {
      // Migración simple de sesiones antiguas (solo token).
      const legacyToken = localStorage.getItem(LEGACY_TOKEN_KEY);

      return legacyToken ? { token: legacyToken, roles: [] } : null;
    }

    try {
      const parsed = JSON.parse(raw);

      return {
        ...parsed,
        token: parsed?.token ?? null,
        roles: Array.isArray(parsed?.roles) ? parsed.roles : [],
      };
    } catch {
      return null;
    }
  }

  remove() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  }
}
