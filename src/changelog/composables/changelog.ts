import changelog from '@/database/changelog.json';
import { ChangelogItem } from '@/changelog/types';

export function useChangelog(): { changelog: ChangelogItem[] } {
  return { changelog };
}
