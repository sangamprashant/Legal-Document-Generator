import { DocumentRepository } from "../repositories/document.repository";

export const DocumentService = {
  async uploadDocuments(
    files: Express.Multer.File[],
    user_id: number,
    case_id: number
  ) {
    const uploads = files.map((file) => {
      const documentData = {
        user_id,
        case_id,
        file_path: file.path,
        original_name: file.originalname,
        mime_type: file.mimetype,
        size: file.size,
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
};
