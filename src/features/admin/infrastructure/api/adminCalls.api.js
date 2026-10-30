// src/features/admin/infrastructure/api/adminCalls.api.js

import { authenticatedFetch } from "../../../../shared/infrastructure/http/authenticatedFetch";

const BASE_URL = "/api";

// Infrastructure Gateway:
// Parses the standard ApiResponse body ({message, data, error}) and throws
// an Error carrying the backend message plus the machine-readable code.
async function unwrap(response, fallbackMessage) {
  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(json?.message || fallbackMessage);

    error.code = json?.error || null;
    error.status = response.status;

    throw error;
  }

  return json?.data;
}

// Infrastructure Gateway: lists calls for the administration screens.
export async function fetchAdminCalls() {
  const response = await authenticatedFetch(`${BASE_URL}/calls`);

  return await unwrap(response, "Error cargando convocatorias");
}

// Infrastructure Gateway: POST /api/calls (RN-07 validation lives in backend).
export async function createCallRequest(payload) {
  const response = await authenticatedFetch(`${BASE_URL}/calls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await unwrap(response, "Error creando la convocatoria");
}

// Infrastructure Gateway: PUT /api/calls/{id} (full replacement).
export async function updateCallRequest(id, payload) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await unwrap(response, "Error actualizando la convocatoria");
}

// Infrastructure Gateway: PATCH /api/calls/{id}/close (manual close).
export async function closeCallRequest(id) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}/close`, {
    method: "PATCH",
  });

  return await unwrap(response, "Error cerrando la convocatoria");
}

// Infrastructure Gateway: PATCH /api/calls/{id}/reopen (manual reopen).
export async function reopenCallRequest(id) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}/reopen`, {
    method: "PATCH",
  });

  return await unwrap(response, "Error reabriendo la convocatoria");
}

// Infrastructure Gateway: DELETE /api/calls/{id} (409 CALL_HAS_APPLICATIONS).
export async function deleteCallRequest(id) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}`, {
    method: "DELETE",
  });

  return await unwrap(response, "Error eliminando la convocatoria");
}
