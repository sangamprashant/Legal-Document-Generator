export type DocumentOption = {
  label: string;
  category: string;
};

export const documentTypesWithCategory: DocumentOption[] = [
  // Personal Identification
  { label: "Aadhaar Card", category: "Personal Identification" },
  { label: "PAN Card", category: "Personal Identification" },
  { label: "Voter ID", category: "Personal Identification" },
  { label: "Passport", category: "Personal Identification" },
  { label: "Driving License", category: "Personal Identification" },
  { label: "Birth Certificate", category: "Personal Identification" },

  // Address Proof
  { label: "Utility Bill", category: "Address Proof" },
  { label: "Rent Agreement", category: "Address Proof" },
  { label: "Ration Card", category: "Address Proof" },
  { label: "Property Tax Receipt", category: "Address Proof" },
  { label: "Bank Passbook", category: "Address Proof" },

  // Financial Documents
  { label: "Bank Statement", category: "Financial Document" },
  { label: "Income Tax Return", category: "Financial Document" },
  { label: "Salary Slip", category: "Financial Document" },
  { label: "Form 16", category: "Financial Document" },
  { label: "Loan Document", category: "Financial Document" },

  // Property & Asset Documents
  { label: "Sale Deed", category: "Property Document" },
  { label: "Gift Deed", category: "Property Document" },
  { label: "Property Registration Papers", category: "Property Document" },
  { label: "Encumbrance Certificate", category: "Property Document" },
  { label: "Mutation Certificate", category: "Property Document" },
  { label: "Lease Agreement", category: "Property Document" },
  { label: "Title Deed", category: "Property Document" },

  // Legal Case & Court Documents
  { label: "FIR Copy", category: "Legal Document" },
  { label: "Charge Sheet", category: "Legal Document" },
  { label: "Court Summons", category: "Legal Document" },
  { label: "Affidavit", category: "Legal Document" },
  { label: "Witness Statement", category: "Legal Document" },
  { label: "Judgement Copy", category: "Legal Document" },
  { label: "Legal Notice", category: "Legal Document" },

  // Affidavits & Declarations
  { label: "Notarized Affidavit", category: "Declaration & Affidavit" },
  { label: "Self-Declaration Form", category: "Declaration & Affidavit" },
  { label: "Indemnity Bond", category: "Declaration & Affidavit" },
  { label: "Power of Attorney", category: "Declaration & Affidavit" },

  // Family & Personal Records
  { label: "Marriage Certificate", category: "Family & Personal Record" },
  { label: "Divorce Decree", category: "Family & Personal Record" },
  { label: "Death Certificate", category: "Family & Personal Record" },
  { label: "Adoption Papers", category: "Family & Personal Record" },
  { label: "Guardianship Order", category: "Family & Personal Record" },

  // Educational & Professional
  { label: "Degree Certificate", category: "Educational & Professional" },
  { label: "Mark Sheets", category: "Educational & Professional" },
  { label: "School Leaving Certificate", category: "Educational & Professional" },
  { label: "Employment Letter", category: "Educational & Professional" },
  { label: "Professional License", category: "Educational & Professional" },

  // Miscellaneous
  { label: "Medical Report", category: "Miscellaneous" },
  { label: "Insurance Policy Document", category: "Miscellaneous" },
  { label: "Vehicle Registration Certificate", category: "Miscellaneous" },
  { label: "No Objection Certificate", category: "Miscellaneous" },
  { label: "Succession Certificate", category: "Miscellaneous" },
  { label: "Will / Probate Document", category: "Miscellaneous" }
];
