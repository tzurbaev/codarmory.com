import { defineStore } from 'pinia';
import attachments from '@/database/attachments.json';
import stats from '@/database/attachment-stats.json';
import categories from '@/database/attachment-categories.json';
import { Attachment, AttachmentCategory, AttachmentStat } from '@/attachments/types';
import { UnlockType } from '@/unlocks/types';
import { Weapon } from '@/weapons/types';
import { useWeaponsStore } from '@/weapons/stores/weapons';

interface AttachmentsState {
  attachments: Attachment[];
  stats: AttachmentStat[];
  categories: AttachmentCategory[];
}

function getAttachmentStats(attachmentStats: string[]): AttachmentStat[] {
  return attachmentStats.map((statId): AttachmentStat | undefined => stats.find((statItem: AttachmentStat) => statItem.id === statId))
    .filter((stat: AttachmentStat | undefined): boolean => stat !== undefined) as AttachmentStat[];
}

export const useAttachmentsStore = defineStore({
  id: 'attachments',
  state: () => ({
    attachments,
    stats,
    categories,
  }) as AttachmentsState,

  getters: {
    extendedAttachments(): Attachment[] {
      const weaponsStore = useWeaponsStore();

      return this.attachments.map((attachment: Attachment) => ({
        ...attachment,
        category: this.categories.find((category: AttachmentCategory) => category.id === attachment.category_id),
        stats: {
          pros: getAttachmentStats(attachment.pros),
          cons: getAttachmentStats(attachment.cons),
        },
        weapon: attachment.unlock_type === UnlockType.Weapon && attachment.unlock_id
          ? weaponsStore.extendedWeapons.find((item: Weapon) => item.id === attachment.unlock_id)
          : null,
      }));
    },
  },
});
