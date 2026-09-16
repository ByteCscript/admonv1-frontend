import { DocumentRepository } from "../../domain/repositories/DocumentRepository";
import { uploadDocumentRequest } from "../api/documents.api";

// Adapter Pattern:
// Adapts HTTP document operations to the domain contract.
export class HttpDocumentRepository extends DocumentRepository {
  async upload(file, onProgress) {
    return await uploadDocumentRequest(file, onProgress);
  }
}
