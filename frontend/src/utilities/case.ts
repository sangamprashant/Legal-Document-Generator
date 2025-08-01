// src/constants/caseStatus.ts
export const CASE_STATUS = ['Pending', 'In Progress', 'Resolved', 'Closed'] as const;

export type CaseStatus = typeof CASE_STATUS[number];

export const STATUS_COLOR_MAP: Record<CaseStatus, string> = {
  Pending: 'text-yellow-600 bg-yellow-100',
  'In Progress': 'text-blue-600 bg-blue-100',
  Resolved: 'text-green-600 bg-green-100',
  Closed: 'text-gray-600 bg-gray-100',
};