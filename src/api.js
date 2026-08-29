const BASE = '/api';

export async function getCalls() {
  const res = await fetch(`${BASE}/calls`);
  const json = await res.json();
  return json.data;
}

export async function getCall(callId) {
  const res = await fetch(`${BASE}/calls/${callId}`);
  const json = await res.json();
  return json.data;
}

export async function generatePresignedUrl(fileName, contentType, size) {
  const res = await fetch(`${BASE}/documents/presigned-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName, contentType, size }),
  });
  const json = await res.json();
  return json.data;
}

export async function uploadFile(file, onProgress) {
  const presigned = await generatePresignedUrl(file.name, file.type, file.size);

  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', presigned.uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(xhr));
    xhr.onerror = () => reject(xhr);
    xhr.send(file);
  });

  const res = await fetch(`${BASE}/documents/${presigned.documentId}/complete`, {
    method: 'POST',
  });
  const json = await res.json();
  return json.data;
}

export async function createApplication(callId, residentId, documentIds) {
  const res = await fetch(`${BASE}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callId, residentId, documentIds }),
  });
  const json = await res.json();
  return json.data;
}

export async function getApplications(residentId, page = 0, size = 10) {
  const params = new URLSearchParams({ page, size });
  if (residentId) params.set('residentId', residentId);
  const res = await fetch(`${BASE}/applications?${params}`);
  const json = await res.json();
  return json.data;
}

export async function getApplication(applicationId) {
  const res = await fetch(`${BASE}/applications/${applicationId}`);
  const json = await res.json();
  return json.data;
}
