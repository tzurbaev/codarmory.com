import records from '@/database/changelog.json';
import { ChangelogItem, ChangelogRecord } from '@/changelog/types';
import { computed, ComputedRef } from 'vue';

export function useChangelog(): { changelog: ComputedRef<ChangelogItem[]> } {
  const changelog: ComputedRef<ChangelogItem[]> = computed(() => records.map((item: ChangelogRecord) => ({
    date: item.date,
    lines: Array.isArray(item.description) ? item.description : [item.description],
  })));

  return { changelog };
}
