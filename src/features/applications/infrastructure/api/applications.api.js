// src/features/applications/infrastructure/api/applications.api.js
import { getToken } from "../../../../api";

const BASE_URL = "/api";

// Infrastructure Gateway:
// Creates an authenticated application through the backend API.
export async function createApplicationRequest({
  convocationId,
  residentId,
  documentIds,
}) {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
