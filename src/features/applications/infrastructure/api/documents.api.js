//src/features/applications/infrastructure/api/documents.api.js
import { getToken } from "../../../../api";

const BASE_URL = "/api";

// Infrastructure Gateway:
// Requests an authorized upload URL from the backend.
async function generatePresignedUrl(file) {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/documents/presigned-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error generating upload URL: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Infrastructure Gateway:
// Uploads the binary directly through the presigned URL.
function uploadBinary(file, uploadUrl, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed"));
    };

    xhr.send(file);
  });
}

// Infrastructure Gateway:
// Confirms the upload with the authenticated backend.
async function completeDocument(documentId) {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/documents/${documentId}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error completing document: ${response.status}`);
  }

  const json = await response.json();

  return json.data;
}

// Facade Pattern:
// Coordinates the complete document upload workflow.
export async function uploadDocumentRequest(file, onProgress) {
  const presigned = await generatePresignedUrl(file);

  await uploadBinary(file, presigned.uploadUrl, onProgress);

  return await completeDocument(presigned.documentId);
}
