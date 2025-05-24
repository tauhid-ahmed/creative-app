export const ISSUE_STATUSES = ["OPEN", "CLOSED", "IN_PROGRESS"] as const;
export const ISSUE_FEATURES = [
  "Task",
  "Improvements",
  "Test",
  "Refactor",
  "Documentation",
  "Bug",
  "Feature",
] as const;

export type IssueStatus = (typeof ISSUE_STATUSES)[number];
export type IssueFeature = (typeof ISSUE_FEATURES)[number];
