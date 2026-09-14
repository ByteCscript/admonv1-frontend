const BASE_URL = "/api";

// Infrastructure Gateway:
// Centralizes HTTP communication with external services.
//
// Single Responsibility Principle:
// This module is only aware of HTTP transport details.
export async function fetchConvocations() {
  const response = await fetch(`${BASE_URL}/calls`);

  if (!response.ok) {
    throw new Error(`Error loading convocations: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway:
// Retrieves a specific convocation through HTTP.
export async function fetchConvocationById(id) {
  const response = await fetch(`${BASE_URL}/calls/${id}`);

  if (!response.ok) {
    throw new Error(`Error loading convocation: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}
