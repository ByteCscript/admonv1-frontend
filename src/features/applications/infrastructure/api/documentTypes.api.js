// src/features/applications/infrastructure/api/documentTypes.api.js

import { authenticatedFetch } from "../../../../shared/infrastructure/http/authenticatedFetch";

const BASE_URL = "/api";

// Infrastructure Gateway:
// Requests the catalog of document types from the backend.
export async function fetchDocumentTypes() {
  const response = await authenticatedFetch(
    `${BASE_URL}/documents/types`,
  );

  if (!response.ok) {
    throw new Error(`Error loading document types: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}
