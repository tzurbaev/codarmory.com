import { computed, ComputedRef } from 'vue';
import { Weapon } from '@/weapons/types';
import { useUnlockStore } from '@/unlocks/stores/unlocks';
import { Attachment } from '@/attachments/types';

export function useUnlockModal() {
  const unlocksStore = useUnlockStore();
  const isActive = computed(() => unlocksStore.active);
  const isOpen = computed(() => unlocksStore.open);
  const type = computed(() => unlocksStore.type);

  const weapon: ComputedRef<Weapon | null> = computed(() => unlocksStore.weapon);
  const attachment: ComputedRef<Attachment | null> = computed(() => unlocksStore.attachment);

  const openWeapon = (item: Weapon) => unlocksStore.openWeapon(item);
  const openAttachment = (item: Attachment) => unlocksStore.openAttachment(item);
  const close = () => unlocksStore.close();

  return {
    isActive,
    isOpen,
    type,
    weapon,
    attachment,
    openWeapon,
    openAttachment,
    close,
  };
}
