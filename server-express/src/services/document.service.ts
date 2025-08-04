import { DocumentRepository } from "../repositories/document.repository";

export const DocumentService = {
  async uploadDocuments(
    files: Express.Multer.File[],
    types:string[],
    user_id: number,
    case_id: number,
    status:string
  ) {
    const uploads = files.map((file) => {
      const documentData = {
        user_id,
        case_id,
        type: types[files.indexOf(file)],
        file_path: file.path,
        original_name: file.originalname,
        mime_type: file.mimetype,
        status
      };
      console.log("Document data:", documentData);
      return DocumentRepository.create(documentData);
    });

    return Promise.all(uploads);
  },

  async updateDocument(doc_id: number, data: any) {
    return DocumentRepository.updateByDocId(doc_id, data);
  },

  async getUserDocuments(user_id: number) {
    return DocumentRepository.getByUser(user_id);
  },

  async updateDocumentStatus(doc_id: number, status: string) {
    return DocumentRepository.updtateStatusByDocId(doc_id, status);
  }
};
