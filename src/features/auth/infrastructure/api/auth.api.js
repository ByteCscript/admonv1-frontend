const BASE_URL = "/api";

// Infrastructure Gateway:
// Handles authentication HTTP communication.
export async function loginRequest({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}
