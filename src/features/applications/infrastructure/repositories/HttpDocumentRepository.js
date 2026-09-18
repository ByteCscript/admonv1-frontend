import { DocumentRepository } from "../../domain/repositories/DocumentRepository";
import { uploadDocumentRequest } from "../api/documents.api";
import { fetchDocumentTypes } from "../api/documentTypes.api";

// Adapter Pattern:
// Adapts HTTP document operations to the domain contract.
export class HttpDocumentRepository extends DocumentRepository {
  async upload(documentType, file, onProgress) {
    return await uploadDocumentRequest(documentType, file, onProgress);
  }

  async getTypes() {
    return await fetchDocumentTypes();
  }
}
