import { authRepository } from "../../../features/auth/auth.dependencies";

// Infrastructure Adapter:
// Centralizes authenticated HTTP requests.
export async function authenticatedFetch(url, options = {}) {
  const token = authRepository.getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return await fetch(url, {
    ...options,
    headers,
  });
}
