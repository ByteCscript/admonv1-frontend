const BASE_URL = "/api";

// Infrastructure Gateway:
// Handles HTTP communication for application operations.
export async function createApplicationRequest({
  convocationId,
  residentId,
  documentIds,
}) {
  const response = await fetch(`${BASE_URL}/applications`, {
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
