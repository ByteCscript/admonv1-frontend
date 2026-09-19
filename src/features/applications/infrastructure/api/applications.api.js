// src/features/applications/infrastructure/api/applications.api.js

import { authenticatedFetch } from "../../../../shared/infrastructure/http/authenticatedFetch";

const BASE_URL = "/api";

// Infrastructure Gateway:
// Creates an authenticated application through the backend API.
export async function createApplicationRequest({
  convocationId,
  residentId,
  documentIds,
}) {
  const response = await authenticatedFetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      callId: convocationId,
      residentId,
      documentIds,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error creating application: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway:
// Retrieves authenticated applications from the backend.
export async function fetchApplications({
  residentId,
  page = 0,
  size = 10,
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (residentId) {
    params.set("residentId", residentId);
  }

  const response = await authenticatedFetch(
    `${BASE_URL}/applications?${params}`,
  );

  if (!response.ok) {
    throw new Error(`Error loading applications: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway:
// Retrieves an authenticated application by identifier.
export async function fetchApplicationById(id) {
  const response = await authenticatedFetch(`${BASE_URL}/applications/${id}`);

  if (!response.ok) {
    throw new Error(`Error loading application: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway:
// Checks whether the authenticated resident can apply to a convocation.
export async function checkApplicationEligibility(callId) {
  const response = await authenticatedFetch(
    `${BASE_URL}/applications/check?callId=${callId}`,
  );

  const json = await response.json();

  return {
    status: response.status,
    data: json.data,
    message: json.message,
  };
}
