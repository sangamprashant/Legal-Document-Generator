export type AdminCaseData = {
  cases: CaseDetail[];
};

export type CaseDetail = {
  case_id: number;
  case_status: string;
  case_from: string;
  case_to: string;
  description: string;
  user: {
    user_id: number;
    name: string;
    email: string;
  };
  documents: DocumentDetail[];
};

export type DocumentDetail = {
  doc_id: number;
  doc_type: string | null;
  doc_status: string | null;
  file_path: string;
};
