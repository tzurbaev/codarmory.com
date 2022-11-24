export type Criterion<T> = (item: T) => boolean;

export function getFilteredRecords<T>(records: T[], criteria: Criterion<T>[]): T[] {
  return records.filter((item: T) => criteria.every((criterion: Criterion<T>) => criterion(item)));
}
