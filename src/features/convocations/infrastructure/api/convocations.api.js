const BASE_URL = "/api";

// Infrastructure Gateway:
// Centraliza la comunicación HTTP con servicios externos.
//
// Single Responsibility Principle:
// Este módulo únicamente conoce detalles de transporte HTTP.
export async function fetchConvocations() {
  const response = await fetch(`${BASE_URL}/calls`);

  if (!response.ok) {
    throw new Error(`Error loading convocations: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}
