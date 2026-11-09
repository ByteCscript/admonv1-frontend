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

// Infrastructure Gateway: GET /api/calls/{id}/draw/preview
// C.U-08 paso 2 y FA-01: cupos, solicitudes por estado y si se puede sortear.
export async function fetchDrawPreview(id) {
  const response = await authenticatedFetch(
    `${BASE_URL}/calls/${id}/draw/preview`,
  );

  return await unwrap(response, "Error consultando el resumen del sorteo");
}

// Infrastructure Gateway: POST /api/calls/{id}/draw
// C.U-08 pasos 6-11: ejecuta el sorteo (definitivo, RN-19).
export async function executeDrawRequest(id) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}/draw`, {
    method: "POST",
  });

  return await unwrap(response, "Error ejecutando el sorteo");
}

// Infrastructure Gateway: GET /api/calls/{id}/draw
// C.U-08 paso 13 y FA-03: resultado y auditoría (RN-20, RN-21).
export async function fetchDrawResult(id) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}/draw`);

  return await unwrap(response, "Error consultando el resultado del sorteo");
}

// Infrastructure Gateway: GET /api/calls/{id}/draw/results
// CU 1.1.2 D4: listado de resultados del sorteo (residente y admin).
export async function fetchDrawResults(id) {
  const response = await authenticatedFetch(
    `${BASE_URL}/calls/${id}/draw/results`,
  );

  return await unwrap(response, "Error consultando los resultados del sorteo");
}

// Infrastructure Gateway: GET /api/calls/{id}/draw/hash
// CU 1.1.2 D3: huella de integridad del CSV exportado.
export async function fetchDrawHash(id) {
  const response = await authenticatedFetch(
    `${BASE_URL}/calls/${id}/draw/hash`,
  );

  return await unwrap(response, "Error consultando la huella de integridad");
}

// Infrastructure Gateway: GET /api/admin/calls/{id}/draw/export
// CU 1.1.2 D5: exporta el CSV del sorteo (solo ROLE_ADMIN). Devuelve un blob.
export async function exportDrawCsvRequest(id) {
  const response = await authenticatedFetch(
    `${BASE_URL}/admin/calls/${id}/draw/export`,
  );

  if (!response.ok) {
    const json = await response.json().catch(() => null);
    const error = new Error(json?.message || "Error exportando el CSV del sorteo");

    error.code = json?.error || null;
    error.status = response.status;
    throw error;
  }

  return await response.blob();
}

// Infrastructure Gateway: DELETE /api/calls/{id} (409 CALL_HAS_APPLICATIONS).
export async function deleteCallRequest(id) {
  const response = await authenticatedFetch(`${BASE_URL}/calls/${id}`, {
    method: "DELETE",
  });

  return await unwrap(response, "Error eliminando la convocatoria");
}
