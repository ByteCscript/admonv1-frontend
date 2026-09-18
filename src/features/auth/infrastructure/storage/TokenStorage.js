const TOKEN_KEY = "auth_token";

// Storage Adapter:
// Centralizes authentication token persistence.
export class TokenStorage {
  save(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  get() {
    return localStorage.getItem(TOKEN_KEY);
  }

  remove() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
