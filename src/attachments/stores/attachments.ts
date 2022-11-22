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
          pros: this.stats.filter((stat: AttachmentStat) => attachment.pros.indexOf(stat.id) !== -1),
          cons: this.stats.filter((stat: AttachmentStat) => attachment.cons.indexOf(stat.id) !== -1),
        },
        weapon: attachment.unlock_type === UnlockType.Weapon && attachment.unlock_id
          ? weaponsStore.extendedWeapons.find((item: Weapon) => item.id === attachment.unlock_id)
          : null,
      }));
    },
  },
});
