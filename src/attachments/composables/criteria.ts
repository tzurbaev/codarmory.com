import { Criterion } from '@/database/criteria';
import { Attachment } from '@/attachments/types';

function passesStatsFilter(stats: string[], matchAll: boolean, attachmentStats: string[]): boolean {
  if (!stats.length) {
    return true;
  } else if (!attachmentStats.length) {
    return false;
  } else if (!matchAll) {
    return attachmentStats.some((item: string) => stats.indexOf(item) !== -1);
  }

  return stats.every((item: string) => attachmentStats.indexOf(item) !== -1);
}

export function getAttachmentProsCriterion(stats: string[], matchAll: boolean): Criterion<Attachment> {
  return (attachment: Attachment): boolean => passesStatsFilter(stats, matchAll, attachment.pros);
}

export function getAttachmentConsCriterion(stats: string[], matchAll: boolean): Criterion<Attachment> {
  return (attachment: Attachment): boolean => passesStatsFilter(stats, matchAll, attachment.cons);
}

export function getAttachmentSearchCriterion(search?: string | null): Criterion<Attachment> {
  const query = typeof search === 'string' ? search.toLowerCase() : null;

  return (attachment: Attachment): boolean => {
    if (!query) {
      return true;
    }

    return attachment.name.toLowerCase().includes(query) || attachment.id.toLowerCase().includes(query);
  };
}
