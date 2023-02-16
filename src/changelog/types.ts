export interface ChangelogRecord {
  date: string;
  description: string | string[];
}

export interface ChangelogItem {
  date: string;
  lines: string[];
}
