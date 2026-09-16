// src/features/convocations/infrastructure/api/convocations.api.js
import { getToken } from "../../../../api.js";
const BASE_URL = "/api";

// Infrastructure Gateway:
// Centralizes HTTP communication with external services.
//
// Single Responsibility Principle:
// This module is only aware of HTTP transport details.
export async function fetchConvocations() {
  console.log("ENTRÓ A fetchConvocations");

  const token = await getToken();

  console.log("TOKEN RECIBIDO:", token);

  const response = await fetch(`${BASE_URL}/calls`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/calls/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error loading convocation: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}
