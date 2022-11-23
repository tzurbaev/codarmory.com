import { defineStore } from 'pinia';
import { Weapon } from '@/weapons/types';
import { Attachment } from '@/attachments/types';

interface UnlocksState {
  active: boolean;
  open: boolean;
  type: string | null;
  weapon: Weapon | null;
  attachment: Attachment | null;
}

export const useUnlockStore = defineStore({
  id: 'unlocks',
  state: () => ({
    active: false,
    open: false,
    type: null,
    weapon: null,
    attachment: null,
  }) as UnlocksState,

  actions: {
    openWeapon(weapon: Weapon) {
      this.active = true;
      this.type = 'weapon';
      this.weapon = weapon;
      this.open = true;
    },

    openAttachment(attachment: Attachment) {
      this.active = true;
      this.type = 'attachment';
      this.attachment = attachment;
      this.open = true;
    },

    close() {
      this.open = false;
      setTimeout(() => {
        this.type = null;
        this.weapon = null;
        this.attachment = null;
        this.active = false;
      }, 500);
    },
  },
});
