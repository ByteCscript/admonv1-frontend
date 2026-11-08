// src/features/convocations/infrastructure/api/convocations.api.js

import { authenticatedFetch } from "../../../../shared/infrastructure/http/authenticatedFetch";

const BASE_URL = "/api";

// Infrastructure Gateway:
// Centralizes HTTP communication with external services.
//
// Single Responsibility Principle:
// This module is only aware of HTTP transport details.
export async function fetchConvocations() {
  console.log("ENTRÓ A fetchConvocations");

  const response = await authenticatedFetch(`${BASE_URL}/calls`);

  console.log("CALLS STATUS:", response.status);

  if (!response.ok) {
    throw new Error(`Error loading convocations: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway:
// Retrieves a specific convocation through HTTP.
export async function fetchConvocationById(id) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}`);

  if (!response.ok) {
    throw new Error(`Error loading convocation: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway: GET /api/calls/{id}/draw/results
// CU 1.1.2 D4: resultados del sorteo visibles para el residente autenticado.
export async function fetchResidentDrawResults(id) {
  const response = await authenticatedFetch(
    `${BASE_URL}/calls/${id}/draw/results`,
  );

  if (!response.ok) {
    throw new Error(`Error loading draw results: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway: GET /api/calls/{id}/draw/hash
// CU 1.1.2 D3: huella de integridad del CSV del sorteo.
export async function fetchResidentDrawHash(id) {
  const response = await authenticatedFetch(
    `${BASE_URL}/calls/${id}/draw/hash`,
  );

  if (!response.ok) {
    throw new Error(`Error loading draw hash: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}
