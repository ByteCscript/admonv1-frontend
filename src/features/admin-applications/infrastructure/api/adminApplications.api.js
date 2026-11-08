import { authenticatedFetch } from "../../../../shared/infrastructure/http/authenticatedFetch";

export async function getAdminApplicationsApi({ callId, status, page = 0, size = 50 } = {}) {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (callId) params.set("callId", String(callId));
  if (status) params.set("status", status);
  const res = await authenticatedFetch(`/api/admin/applications?${params}`, { method: "GET" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.message || "Error cargando postulaciones"), { status: res.status, code: err.error });
  }
  const body = await res.json();
  return body.data;
}

export async function getAdminApplicationDetailApi(id) {
  const res = await authenticatedFetch(`/api/admin/applications/${id}`, { method: "GET" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.message || "Error cargando postulacion"), { status: res.status, code: err.error });
  }
  const body = await res.json();
  return body.data;
}

export async function acceptAdminApplicationApi(id) {
  const res = await authenticatedFetch(`/api/applications/${id}/accept`, { method: "PATCH" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.message || "Error aprobando postulacion"), { status: res.status, code: err.error });
  }
  const body = await res.json();
  return body.data;
}

export async function rejectAdminApplicationApi(id, reason) {
  const res = await authenticatedFetch(`/api/applications/${id}/reject`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason: reason || null }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.message || "Error rechazando postulacion"), { status: res.status, code: err.error });
  }
  const body = await res.json();
  return body.data;
}

export async function getDocumentReadUrlApi(applicationId, documentId) {
  const res = await authenticatedFetch(`/api/admin/applications/${applicationId}/documents/${documentId}/url`, { method: "GET" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.message || "Error obteniendo la URL del documento"), { status: res.status, code: err.error });
  }
  const body = await res.json();
  return body.data;
}
